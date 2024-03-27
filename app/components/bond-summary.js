import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BondSummaryComponent extends Component {
  @tracked currentPage = 1;
  @tracked pageSize = 50;

  get paginatedPartyTotals() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.partyTotals.slice(start, end);
  }

  get partyTotals() {
    const jsonData = this.args.jsonData;
    const partyTotals = {};

    jsonData.forEach((entry) => {
      const { PartyName, Denominations } = entry;
      if (!partyTotals[PartyName]) {
        partyTotals[PartyName] = { totalAmount: 0, totalCompanies: 0 };
      }
      partyTotals[PartyName].totalAmount += parseFloat(Denominations);
      partyTotals[PartyName].totalCompanies++;
    });

    // Convert totalAmount to formatted currency string
    for (const partyName in partyTotals) {
      partyTotals[partyName].totalAmount =
        '₹ ' + partyTotals[partyName].totalAmount.toLocaleString();
    }

    return Object.entries(partyTotals).map(([partyName, totals]) => ({
      partyName,
      ...totals,
    }));
  }

  get totalPageCount() {
    return Math.ceil(this.partyTotals.length / this.pageSize);
  }

  get pageNumbers() {
    return Array.from({ length: this.totalPageCount }, (_, i) => i + 1);
  }

  @action
  changePage(pageNumber) {
    this.currentPage = pageNumber;
  }

  @action
  selectParty(partyName) {
    alert(`You clicked on ${partyName}`);
  }
}
