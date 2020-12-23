// Load data
let data_cleaned = [];
d3.csv('../data/DataVizCensus2020.csv', (data_original) => {
  let response = {};
  response.years_professional_experience = data_original.years_professional_experience;
  response.years_dataviz_experience = data_original.years_dataviz_experience;
  response.how_did_learn_dataviz = data_original.how_did_learn_dataviz;
  response.highlest_level_education = data_original.highlest_level_education;
  response.personal_dataviz_how_many_hours_a_week = data_original.personal_dataviz_how_many_hours_a_week;
  response.want_for_next_role = data_original.want_for_next_role;
  response.gender_collapsed = data_original.gender_collapsed;

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
});
console.log(data_cleaned);