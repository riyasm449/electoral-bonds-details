import Route from '@ember/routing/route';

export default class PartyDataRoute extends Route {
  model() {
    return {
      columns: [
        { name: 'Name', valuePath: 'name' },
        { name: 'Total Amount', valuePath: 'totalAmount' },
        { name: 'Total Companies', valuePath: 'totalCompanies' },
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
          valuePath: 'totalCompanies',
          isAscending: true,
        },
      ],
      tableOptions: {
        enableSync: true,
      },
      parties: this.modelFor('application').partiesArray,
    };
  }
}
