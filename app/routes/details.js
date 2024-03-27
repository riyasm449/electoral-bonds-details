import Route from '@ember/routing/route';

export default class DetailsRoute extends Route {
  model(transition, queryParams) {
    let { type, name } = queryParams.to.queryParams;
    let data = {
      columns: [
        { name: 'Name', valuePath: 'name' },
        { name: 'Total Amount', valuePath: 'total' },
      ],
      type: type,
      name: name,
      details: [],
    };
    if (type == 'party') {
      let parties = this.modelFor('application').parties[name];
      data.totalAmount = parties.totalAmount;
      Object.keys(parties.companies).forEach((key) => {
        data.details.push({ name: key, total: parties.companies[key] });
      });
    }
    if (type == 'company') {
      let companies = this.modelFor('application').companies[name];
      data.totalAmount = companies.totalAmount;
      Object.keys(companies.parties).forEach((key) => {
        data.details.push({ name: key, total: companies.parties[key] });
      });
    }
    return data;
  }
}
