
export class Options {

  getPriorities() {
    return [
            {label: 'Select Priority', value: null},
            {label: 'Critical', value: {id: '1', level: 'Critical'}},
            {label: 'High', value: {id: '2', level: 'High'}},
            {label: 'Medium', value: {id: '3', level: 'Medium'}},
            {label: 'Low', value: {id: '4', level: 'Low'}}
        ];
  }

  getUsers() {
    return [
      {label: 'Select Owner', value: null},
      {label: 'Swathi', value: {id: '1', userName: 'Swathi'}},
      {label: 'Varun', value: {id: '2', userName: 'Varun'}}
    ];
  }

  getStatuses() {
    return [
      {label: 'Select Status', value: null},
      {label: 'Pending', value: {id: '1', status: 'Pending'}},
      {label: 'In Progress', value: {id: '2', status: 'In Progress'}},
      {label: 'Blocked', value: {id: '3', status: 'Blocked'}},
      {label: 'Backlogged', value: {id: '4', status: 'Backlogged'}},
      {label: 'Up for Review', value: {id: '5', status: 'Up for Review'}},
      {label: 'Completed', value: {id: '6', status: 'Completed'}},
      {label: 'Cancelled', value: {id: '7', status: 'Cancelled'}},
  ];
  }

}

export interface Priority {
  id?: string;
  level: string;
}

export interface Users {
  id?: string;
  userName: string;
}

export interface Status {
  id?: string;
  status: string;
}
