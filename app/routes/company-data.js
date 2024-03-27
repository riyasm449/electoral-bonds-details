import Route from '@ember/routing/route';

export default class CompanyDataRoute extends Route {
  model() {
    return {
      columns: [
        { name: 'Name', valuePath: 'name' },
        { name: 'Total Amount', valuePath: 'totalAmount' },
        { name: 'Total Parties', valuePath: 'totalParties' },
      ],
      sorts: [
        {
          valuePath: 'name',
          isAscending: false,
        },
        {
          valuePath: 'totalAmount',
          isAscending: true,
        },
        {
          valuePath: 'totalParties',
          isAscending: true,
        },
      ],
      tableOptions: {
        enableSync: true,
      },
      companies: this.modelFor('application').companiesArray,
    };
  }
}
