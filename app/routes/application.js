// routes/application.js

import Route from '@ember/routing/route';
import Papa from 'papaparse';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class ApplicationRoute extends Route {
  @service router;
  async model() {
    const response = await fetch('/electoralbonddetails.csv');
    const csvData = await response.text();

    // Parse the CSV data
    const parsedData = Papa.parse(csvData, { header: true }).data;

    // Process the parsed data to generate parties and companies
    const parties = {};
    const companies = {};

    parsedData.forEach((entry) => {
      const partyName = entry.PartyName;
      const companyName = entry.CompanyName;
      const amount = this.parseAmount(entry.Denominations);

      if (!parties[partyName]) {
        parties[partyName] = {
          totalAmount: 0,
          totalCompanies: 0,
          companies: {},
        };
      }
      parties[partyName].totalAmount += amount;
      if (!parties[partyName].companies[companyName]) {
        parties[partyName].companies[companyName] = 0;
      }
      parties[partyName].companies[companyName] += amount;
      parties[partyName].totalCompanies = Object.keys(
        parties[partyName].companies
      ).length;

      if (!companies[companyName]) {
        companies[companyName] = {
          totalAmount: 0,
          totalParties: 0,
          parties: {},
        };
      }
      companies[companyName].totalAmount += amount;
      if (!companies[companyName].parties[partyName]) {
        companies[companyName].parties[partyName] = 0;
      }
      companies[companyName].parties[partyName] += amount;
      companies[companyName].totalParties = Object.keys(
        companies[companyName].parties
      ).length;
    });

    // Transform parties and companies into arrays for table
    const partiesArray = Object.keys(parties).map((name) => ({
      name,
      ...parties[name],
    }));

    const companiesArray = Object.keys(companies).map((name) => ({
      name,
      ...companies[name],
    }));

    return {
      partiesArray: partiesArray,
      companiesArray: companiesArray,
      parties: parties,
      companies: companies,
    };
  }

  parseAmount(amountString) {
    // Remove any non-numeric characters
    const numericAmountString = amountString.replace(/[^\d.,]/g, '');

    // Replace comma with dot as decimal point
    const numericAmount = parseFloat(numericAmountString.replace(',', '.'));

    // Remove the ₹ symbol and convert to crore
    const croreAmount = numericAmount * 10000000; // 1 crore = 10,000,000

    return croreAmount;
  }

  @action
  redirectToPartyData() {
    this.router.transitionTo('party-data');
  }
  @action
  redirectToCompanyData() {
    this.router.transitionTo('company-data');
  }
}
