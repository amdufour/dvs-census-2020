// Load data
let data_cleaned = [];
d3.csv('../data/DataVizCensus2020.csv', (data_original) => {
  let response = {};
  if (data_original.years_professional_experience !== 'NA' && data_original.years_dataviz_experience !== 'NA' && data_original.work_weekly_hours !== 'NA') {
    getData();
  }

  function getData() {
    response.uid = data_original.uid;
    response.years_professional_experience = data_original.years_professional_experience;
    // response.years_dataviz_experience = data_original.years_dataviz_experience;
    response.how_did_learn_dataviz = data_original.how_did_learn_dataviz;
    response.highlest_level_education = data_original.highlest_level_education;
    response.personal_dataviz_how_many_hours_a_week = data_original.personal_dataviz_how_many_hours_a_week;
    response.want_for_next_role = data_original.want_for_next_role;
    response.gender_collapsed = data_original.gender_collapsed;
    response.work_weekly_hours = data_original.work_weekly_hours;
    response.work_hours_on_creating_implementing_producing_dataviz = data_original.work_hours_on_creating_implementing_producing_dataviz;
    response.work_hours_on_data_engineering = data_original.work_hours_on_data_engineering;
    response.work_hours_on_data_science = data_original.work_hours_on_data_science;
    response.work_hours_on_design = data_original.work_hours_on_design;
    response.work_hours_on_data_prep = data_original.work_hours_on_data_prep;
    response.work_hours_on_portfolio = data_original.work_hours_on_portfolio;

    // DataViz Experience
    switch (data_original.years_dataviz_experience) {
      case 'less than 1':
        response.years_dataviz_experience = 0.5;
        break;
      case '1':
        response.years_dataviz_experience = 1;
        break;
      case '2':
        response.years_dataviz_experience = 2;
        break;
      case '3':
        response.years_dataviz_experience = 3;
        break;
      case '4':
        response.years_dataviz_experience = 4;
        break;
      case '5':
        response.years_dataviz_experience = 5;
        break;
      case '(5-10]':
        response.years_dataviz_experience = 8;
        break;
      case '(11-15]':
        response.years_dataviz_experience = 13;
        break;
      case '(16-20]':
        response.years_dataviz_experience = 18;
        break;
      case '(21-25]':
        response.years_dataviz_experience = 23;
        break;
      case '(26-30]':
        response.years_dataviz_experience = 28;
        break;
    }

    // Role
    let roles = [];
    data_original.role.split(',').filter(role => role !== 'NA').forEach(role => {
      switch (role) {
        case 'Freelance/Consultant/ Independent contractor':
          roles.push('freelance');
          response.main_freelance_activity = data_original.freelance_main_role;
          break;
        case 'Position in an organization with some data viz job responsibilities':
          roles.push('employed');
          response.main_employed_activity = data_original.employed_main_role;
          break;
        case 'Non-compensated data visualization hobbyist':
          roles.push('hobbyist');
          break;
        case 'Student':
          roles.push('student');
          response.student_degree_field = data_original.student_degree_field;
          break;
        case 'Academic/Teacher':
          roles.push('academic');
          response.academic_area = data_original.academic_area;
          break;
        case 'Passive income from data visualization related products':
          roles.push('passive_income');
          break;
      }
    });
    response.roles = roles;
    
    data_cleaned.push(response);
  }
});
console.log(data_cleaned);