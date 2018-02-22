
export class Options {

  getPriorities() {
    return [
            {label: 'Select Priority', value: null},
            {label: 'Critical', value: {level: 'Critical'}},
            {label: 'High', value: {level: 'High'}},
            {label: 'Medium', value: {level: 'Medium'}},
            {label: 'Low', value: {level: 'Low'}}
        ];
  }

  getUsers() {
    return [
      {label: 'Select Owner', value: null},
      {label: 'Swathi', value: {userName: 'Swathi'}},
      {label: 'Varun', value: {userName: 'Varun'}}
    ];
  }

  getStatuses() {
    return [
      {label: 'Select Status', value: null},
      {label: 'Pending', value: {status: 'Pending'}},
      {label: 'In Progress', value: {status: 'In Progress'}},
      {label: 'Blocked', value: {status: 'Blocked'}},
      {label: 'Backlogged', value: {status: 'Backlogged'}},
      {label: 'Up for Review', value: {status: 'Up for Review'}},
      {label: 'Completed', value: {status: 'Completed'}},
      {label: 'Cancelled', value: {status: 'Cancelled'}},
  ];
  }

}

export interface Priority {
  level: string;
}

export interface Users {
  userName: string;
}

export interface Status {
  status: string;
}
