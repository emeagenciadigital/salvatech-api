const users = require('./users/users.service.js');
const companies = require('./companies/companies.service.js');
const professions = require('./professions/professions.service.js');
const skills = require('./skills/skills.service.js');
const companyUsers = require('./company-users/company-users.service.js');
const usersSkills = require('./users-skills/users-skills.service.js');
const userWorkExperience = require('./user-work-experience/user-work-experience.service.js');
const userEducation = require('./user-education/user-education.service.js');
const companyUsersWishList = require('./company-users-wish-list/company-users-wish-list.service.js');
const companyOnboardings = require('./company-onboardings/company-onboardings.service.js');
const companyOnboardingFiles = require('./company-onboarding-files/company-onboarding-files.service.js');
const companyOnboardingMeetings = require('./company-onboarding-meetings/company-onboarding-meetings.service.js');
const requestMembers = require('./request-members/request-members.service.js');
const standUp = require('./stand-up/stand-up.service.js');
const tasks = require('./tasks/tasks.service.js');
const taskFiles = require('./task-files/task-files.service.js');
const taskTimeTracking = require('./task-time-tracking/task-time-tracking.service.js');
const supportTickets = require('./support-tickets/support-tickets.service.js');
const projects = require('./projects/projects.service.js');
const projectUsers = require('./project-users/project-users.service.js');
const requestMemberSkills = require('./request_member_skills/request_member_skills.service.js');
const userActivitiesLogs = require('./user-activities-logs/user-activities-logs.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(companies);
  app.configure(professions);
  app.configure(skills);
  app.configure(companyUsers);
  app.configure(usersSkills);
  app.configure(userWorkExperience);
  app.configure(userEducation);
  app.configure(companyUsersWishList);
  app.configure(companyOnboardings);
  app.configure(companyOnboardingFiles);
  app.configure(companyOnboardingMeetings);
  app.configure(requestMembers);
  app.configure(standUp);
  app.configure(tasks);
  app.configure(taskFiles);
  app.configure(taskTimeTracking);
  app.configure(supportTickets);
  app.configure(projects);
  app.configure(projectUsers);
  app.configure(requestMemberSkills);
  app.configure(userActivitiesLogs);
};
