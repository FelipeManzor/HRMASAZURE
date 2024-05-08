DROP DATABASE if exists hrmas;
CREATE DATABASE hrmas;
USE hrmas;


-- Create table schema
-- Create the Category table
CREATE TABLE Category
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL
);

-- Create the Question table
CREATE TABLE Question
(
    id                      INT PRIMARY KEY AUTO_INCREMENT,
    title                   VARCHAR(255) NOT NULL,
    body                    TEXT         NOT NULL,
    category_id             INT,
    best_practice_statement TEXT,
    FOREIGN KEY (category_id) REFERENCES Category (id)
);

-- Create the QuestionSet table
CREATE TABLE QuestionSet
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Create the QuestionSetDetail table (link between Question and QuestionSet)
CREATE TABLE QuestionSetDetail
(
    question_id     INT,
    question_set_id INT,
    weight          INT default 1,
    PRIMARY KEY (question_id, question_set_id),
    FOREIGN KEY (question_set_id) REFERENCES QuestionSet (id),
    FOREIGN KEY (question_id) REFERENCES Question (id)
);

-- Create the Industry table
CREATE TABLE Industry
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the Survey table
CREATE TABLE Survey
(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(255) NOT NULL,
    principal       VARCHAR(255) NOT NULL,
    industry_id     INT,
    company_name    VARCHAR(255) NOT NULL,
    headcount       INT,
    description     TEXT,
    start_date      DATE,
    submission_date DATE,
    status          INT default 0 NOT NULL,
    previous_status Int,
    question_set_id Int,
    link            VARCHAR(255) NOT NULL,
    FOREIGN KEY (question_set_id) REFERENCES QuestionSet (id),
    FOREIGN KEY (industry_id) REFERENCES Industry (id)
);

-- Create the Response table
CREATE TABLE Response
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    value       INT,
    adjustment  INT,
    question_id INT,
    survey_id   INT,
    FOREIGN KEY (question_id) REFERENCES Question (id),
    FOREIGN KEY (survey_id) REFERENCES Survey (id)
);

-- Create the Attachment table
CREATE TABLE Attachment
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    response_id Int,
    name        VARCHAR(255) NOT NULL,
    path        VARCHAR(255) NOT NULL,
    size        INT,
    FOREIGN KEY (response_id) REFERENCES Response (id)
);


-- Necessary Data
-- industries
INSERT INTO industry (name, description)
VALUES ('Agriculture & Food', 'This industry includes farming, livestock breeding, food processing, and distribution.'),
       ('Energy & Utilities', 'This industry covers electricity, oil & gas, water, and waste management.'),
       ('Materials & Construction',
        'This industry encompasses chemicals, metals, cement, glass, and construction services.'),
       ('Consumer Goods', 'This industry includes apparel, footwear, furniture, appliances, and toys.'),
       ('Consumer Services',
        'This industry encompasses retail, restaurants, hotels, entertainment, and personal services.'),
       ('Healthcare', 'This industry covers hospitals, pharmaceuticals, medical devices, and healthcare services.'),
       ('Finance', 'This industry includes banks, insurance companies, investment firms, and real estate.'),
       ('Information Technology',
        'This industry covers software development, hardware manufacturing, telecommunications, and internet services.'),
       ('Transportation & Logistics',
        'This industry includes airlines, shipping companies, trucking, and warehousing.'),
       ('Government & Non-Profit',
        'This industry covers public administration, education, healthcare (public sector), and social services.');

-- categories
INSERT INTO Category (name)
VALUES ('RECRUITMENT AND SELECTION'),
       ('EMPLOYMENT DOCUMENTATION AND INDUCTION'),
       ('PAY, LEAVE AND ENTITLEMENTS'),
       ('POLICIES AND PROCEDURES'),
       ('PERFORMANCE MANAGEMENT'),
       ('LEARNING AND DEVELOPMENT'),
       ('SUCCESSION PLANNING'),
       ('COMPENSATION AND BENEFITS'),
       ('BUSINESS CULTURE AND STRATEGY'),
       ('HR INFORMATION SYSTEM AND DATA SECURITY'),
       ('HR DATA AND ANALYTICS'),
       ('WORKPLACE HEALTH AND SAFETY (WHS)');

-- questions
INSERT INTO Question (title, body, category_id, best_practice_statement)
VALUES ('Recruitment and Selection Processes',
        'Does your organisation have an Equal Employment Opportunity policy which informs your hiring decisions?', 1,
        'The organisation should have an equal employment opportunity policy which is applied when making hiring decisions. The organisation should have policies and procedures which support consistent and fair recruitment and selection processes which provide equal opportunity to all candidates.'),
       ('Interview guides',
        'Does your organisation have a standard set of interview questions when conducting interviews?', 1,
        'Organisations should use a standard set of interview questions when undertaking candidate interviews. Where possible, interviewers should be provided with an interview guide outlining the questions. Interview responses should be noted and the interviewers comments/ratings stored for future reference.'),
       ('Unsuccessful candidates',
        'Does your organisation have a procedure to respond to all candidates regardless if they were successful, including feeback?',
        1,
        'Organisations should respond to all unsuccessful applicants and candidates. Organisations may offer unsuccessful applicants or candidates with feedback. Organisations should have a documented procedure for responding to unsuccessful applicants and candidates, including guidelines as to feedback that can be provided.'),
       ('Candidate checks',
        'Does your organisation have a standard procedure for reference checks?', 1,
        'Organisations should undertake 2 - 3 reference checks with previous professional contacts of the candidate, including their prior manager. These should be documented and stored for future reference. Depending on the role or industry, additional checks may be required such as working rights, working with children checks, police checks, qualification checks, etc. These checks should be completed prior to the employee  onboarding and appropriate records maintained.'),
       ('Job descriptions',
        'Does your organisation have a procedure for Job descriptions to be regularly updated and accessible for all employees?',
        1,
        'A job description should be developed for all roles within the organisation. Each employee should be able to easily access their job description. Job descriptions should be regularly updated to reflect changes in the employee’s position or new processes, etc within the business.'),
       ('Job advertisements and selection criteria',
        'Does your organisation have a job advertisement templates? Does your organisation have a selection criteria procedure?',
        1,
        'When hiring new employees, selection criteria should be developed which match the job description and key qualifications/skills/attributes for the role. Job advertisements should be legally compliant and demonstrate principles of equal employment opportunity.'),
       ('Recruitment and Selection policies and procedures',
        'Does your organisation have a recruitment process and procedure?', 1,
        'Organisations should have a documented recruitment and selection process for all new hires which enables a consistent and fair process to occur.'),
       ('Diversity and inclusion',
        'Do your organisation have a Diversity and Inclusion policy which outlines the intention of the organisation with respect to hiring diverse staff?',
        1,
        'Organisations should have a diversity and inclusion policy which outlines the intention of the organisation with respect to hiring diverse staff. When hiring new staff, best practice employers have measures in place to promote diversity and inclusivity, which may include training for recruiters and/or interviewers in unconscious bias. Diverse and inclusive practices should be ingrained in the organisation’s culture, with initiatives such as regular communication from leaders or D&I training.'),
       ('Employment Contracts', 'Does your organisation have an employment contract for each employee?', 2,
        'Best practice employers have a contract with each of their employees which are free from errors or omissions and outline the key terms of employment.'),
       ('Records', 'Does your organisationhave a secure central location to store all employee contracts?', 2,
        'The signed copies of these contracts are stored centrally and kept in a location that is easily accessible for relevant team members, whilst being secure and access is restricted for the wider staff base.'),
       ('Induction and onboarding', 'Does your organisation have an onboarding process for new starters?', 2,
        'All new starters to an organisation should be provided with a seamless and complete onboarding process, including the completion of all necessary compliance requirements. Best practice organisations have induction programs for their new starters which allow them to learn about the organisation, their role and its expectations and resources that are available to them for ongoing support as they transition into their role. Best practice employers provide their new starters with a ‘buddy’ or trusted colleague who can assist them on the ground with role specific knowledge and processes.'),
       ('Organisational chart', 'Does your organisation have an updated organisational chart?', 2,
        'The business should have an organisational chart which is regularly updated and easily accessible for all staff. New starters should be provided with an overview of their managers and any direct reports. This may be included in the job description or organisational chart.'),
       ('Redundancies', 'Does your organisation have a Redundancies policy and procedure in place?', 2,
        'Best practice organisations have a policy and procedure in place at the ready should they need to execute any lawful redundancies. This would cover the procedure, voluntary requests, notice periods, redeployment options, severance pay and entitlements, etc.'),
       ('Payroll Procedures',
        'Does your organisation have a payroll procedure in place and compliant with record keeping?', 3,
        'Organisations should have a review procedure in place each time a pay run is processed. Some organisations may choose to undertake regular payroll audits to ensure any staff pay and benefits are being paid correctly and on time. Employers may choose to engage a third party, such as an accountant to review their payroll to consider any systematic errors. Organisations should ensure they are compliant with regards to payroll record keeping requirements, payroll reports should be stored securely and the Australian Taxation Office (ATO) requires that both employer and employee records are kept for 7 years. Record keeping requirements extend to confirmation of lodgements for superannuation and, if applicable, payroll tax and workers compensation'),
       ('Contractors',
        'Does your organisation have classifications to determine whether an individual is an employee or contractor?',
        3,
        'Assessed to determine whether they are considered employees or contractors for the purposes of PAYG tax, superannuation, work cover/workers compensation and leave entitlements. The classification of employees can differ between the different employer obligations. Companies should record and understand how their contractors are classified.'),
       ('Superannuation Guarantee Contributions',
        'Is your organisation compliant with superannuation guarantee contributions?', 3,
        'Organisations should ensure that they are compliant with all of their superannuation guarantee contributions. This may be audited as part of a payroll review or reviewed on an employee-by-employee basis.'),
       ('Payroll Compliance', 'Does your organisation have a payroll operating system in place?', 3,
        'Organisations should be operating payroll systems which allow them to accurately record all types of employee leave including long service leave, annual leave, personal leave, etc. This should be occurring automatically, with no manual input or reconciliations required. All employees must be provided with a payslip each pay run'),
       ('Union Representation', 'Does your organisation have a Union presence?', 3,
        'Unions play an important role in the workplace. Some of the key roles include being able to resolve workplace issues by being a voice for employees and acting as a bargaining representative during bargaining negotiations. Organisations should endeavour to work collaboratively with unions, engaging with them proactively to address workplace opportunities and challenges.'),
       ('Departing Employees', 'Does your organisaiton have a Departing Employees procedure?', 4,
        'Organisations should have a departing employee plant to ensure handovers are appropriately completed and there is sufficient knowledge transfer from departing employees. The plan should include collecting from the departing employee any property belonging to the organisation and hold an exit interview prior to departure.'),
       ('HR Policies and Procedures', 'Does your organisation have a suite of policies and procedures?', 4,
        'Organisations should have a suite of HR policies and procedures which use clear language, are as brief as possible, do not include information that may quickly become outdated and are adapted/specific to the situation. When developing new policies and procedures, organisations should consult with managers and employees to gain feedback to improve the newly designed policies and procedures. Procedures should include process maps, diagrams and tables for simplicity and ease-of-use. Each policy and procedure should be assigned a reference number/version number so changes can be easily tracked and a systematic and regular process of reviewing and updating policies can be implemented.'),
       ('Training', 'Are you employees trained on the organisaiton''s HR policies?', 4,
        'An organisation''s HR policies should be widely available and embedded in the everyday practices of an organisation. Records of employees having read and acknowledged the policies should be kept on file by the organisation to support any performance management or disciplinary actions that may need to be taken. Policies should be enforced to ensure they are embedded in the organisation.'),
       ('Conversation Scripts', 'Does your organisation have a scripts guide for difficult conversations?', 4,
        'Conflict management, performance management, inappropriate behaviour or giving feedback can be challenging conversations for supervisors and managers. Supervisors and managers should be trained in these conversations. A bank of scripts and guides can help supervisors and managers prepare for these conversations and serve as a reminder of key points to reduce risk to the organisation and improve outcomes from difficult conversations.'),
       ('Employment Relations', 'Does your organisation have an Employment Relations policy or procedure in place?', 4,
        'Effective employment relations practices assist relationships between employees and managers. Employment relations should focus on treating all employees fairly, equally and with respect and appreciation. Best practice employee relations assist to prevent and resolve disputes and problems and reduce legal risk.'),
       ('HR Policies for Subcontractors', 'Does your organisation have a HR polciy and procedure for Subcontractors?',
        4,
        'Ensure that subcontractors review, adhere to and acknowledge the HR policies and procedures which are entrenched in the organisation.'),
       ('COVID-19 Mandates', 'Do your HR policies include a COVID19 policy?', 4,
        'Employer’s HR policies should be extended to include a COVID19 policy to address the various issues posed by the pandemic. The policy should cover pandemic leave, mandates for vaccinations and support provided by the organisation in the event someone contracts the virus. This can be a temporary policy which is to be reviewed annually, or bi-annually to ensure the policy remains relevant.'),
       ('Performance Reviews', 'Does your organisation conduct regular performance reviews?', 5,
        'Regular employee performance reviews assist to improve individual performance with communication between the employee and their manager. Effective performance management improves employee effectiveness and efficiency within the workplace. Performance review is an opportunity to provide employees with a summary of feedback on job performance, to provide a historical record of performance and to contribute to an employee’s professional development. Performance reviews ensure employees are recognised for their work and are provided with training/development opportunities to acquire further skills and set goals which can be beneficial for both the employee and the organisation. Continuous feedback should be used concurrently with the performance review process; this provides employees with regular growth and development insights.'),
       ('Measuring Performance', 'Does your organisation have a KPI framework in place?', 5,
        'KPIs can provide a quantitative and clear way to set and track employee’s performance against goals and objectives. KPIs set a benchmark of performance and quantitative evidence of under performance or high performance. KPIs can motivate employees to take action and can assist to recognise patterns in order to make adjustments to behaviours and actions.'),
       ('Feedback', 'Does your organisation have a feedback process?', 5,
        'Continuous feedback provides an opportunity for both managers and employees to share their feedback in real-time which improves performance, diffuses conflict before it happens, energises employees and creates performance momentum. Regular feedback increases trust between employees and managers. Continuous feedback boosts team engagement and collaboration. Documenting feedback can assist in supporting performance management conversations and disciplinary actions.'),
       ('Warnings and Terminations', 'Does your organisation have a Disciplinary Policy and Procedure?', 5,
        'Providing employees with warnings can allow an organisation to correct an employee’s behaviour. Warnings are important to help ensure employees understand their employer’s obligations and are evidence of a fair performance management process. In the event that an employee’s employment needs to be terminated, warnings support decisions made to terminate.'),
       ('Performance Improvement Plans', 'Does your organisation have a Performance Improvement Plan (PIP) in place?',
        5,
        'When managing poor performance by employees, Performance Improvement Plans (PIPs) allow employers to provide additional support to employees who are not performing to develop their skills and improve their performance over a set period of time. PIPs allow employers to take early intervention when performance is not adequate. Early intervention can allow an employer to correct an employee’s performance before it becomes entrenched or worsens. Successful PIPs can avoid demotions, disciplinary actions or terminations. Documenting performance improvement in a PIP with structure and formality can help an employee understand the seriousness of the situation, for the business to articulate the performance improvements needed and to demonstrate evidence of the business’ support to the employee.'),
       ('Unfair Dismissal', 'Does your organisation have a Disciplinary and Terminations Policy?', 5,
        'Employers can void unfair dismissal claims by: ensuring employment agreements are lawful and robust, ensuring there is a valid and documented reason for any dismissal, ensuring notice periods and other contractual, award or legislative requirements are complied with,  ensuring employees have the chance to respond to allegations before decisions to terminate are made, maintaining notes and records to be used should justification of the grounds for dismissal be required, transparency between employees and managers regarding expectations of work and opportunities for giving feedback, avoiding on the spot dismissals, Organisations should have documented policies and procedures for disciplinary actions.'),
       ('Training', 'Does your organisation have employee training programs?', 6,
        'Organisations should decide what objectives they are trying to achieve and the knowledge, skills and abilities needed to meet these objectives. Employers operating at best practice need to form an understanding of current employee knowledge, skills and abilities and consult with employees and managers/supervisors to determine training that will be required. Providing training to employees helps employees feel valued, by demonstrating an employer’s commitment. Organisations that have employee training programs have higher employee job satisfaction and lower employee turnover.'),
       ('Licence and Certifications Database',
        'Is there a data management program to record all employee and licences and certifications?', 6,
        'Organisations should have a system and process in place to ensure all employees and subcontractors licence and certifications are current and up to date. This process should address the procedure taken when certifications and qualifications expire.'),
       ('Licence and Certification Validity',
        'Do you have a system and process in place to ensure all employees licences and certifications are current?', 6,
        'Organisations should have a system and process in place to ensure all employees are up to date with their licences and certifications required to perform their work in accordance with regulations. Failures to ensure employees have current licences and certifications is a significant occupational health and safety risk for the business.'),
       ('Career Planning', 'Does your organisaiton have a career planning process in place for employees?', 6,
        'Career planning helps employees to understand their strengths, determine skills they need to develop and identify ways to improve their performance. The result of successful career planning is to build a productive team and to identify talented employees who can be promoted within the organisation. Career planning assists with employee motivation and retention and informs succession planning.'),
       ('Third Party Training',
        'Does your organisation assess the employees skill sets and offer either internal or external training where needed?',
        6,
        'Organisations should assess existing internal skill sets and competencies, as well as the capacity and timing to tailor training sessions relevant to the immediate or future needs of the organisation. If there is no capacity to facilitate training sessions the organisation is responsible to provide this training externally - similarly if there is an accredited requirement the training should be delivered externally.'),
       ('Employee Training Format', 'Does your organisation have an employee training format?', 6,
        'Employee training formats should be determined through an analysis of the required skills and development areas within the organisation. Depending on the content, the delivery may be administered through a face to face delivery model, virtually, or self-paced. Focus areas within the organisation span across the entirety of the employee lifecycle and should include components of coaching, management, development, and mentoring.'),
       ('Organisational Structure', 'Does your organisaiton have an organisational chart?', 7,
        'An organisational chart helps to clearly demonstrate the reporting structures for all employees within the organisation. Organisation charts can help with delegation, responsibility, accountability and workflow.'),
       ('Key Talent', 'Does your organisation have succession planning in place?', 7,
        'Workforce planning is an important part of the talent management process. Successful workforce planning requires understanding existing skills and growth potential of current employees, as well future-proofing your business with key personnel. Successful succession planning increases the availability of capable individuals, assists with retention/motivation, allows for senior leaders to retire or step back from the business and reduces costs of recruitment. Succession planning increases employee morale and reduces turnover. Providing your key talent with growth opportunities helps to retain high performers.'),
       ('Career Progression', 'Does your organisation have a career progression framework?', 7,
        'Career development opportunities are essential for increasing job satisfaction and employee engagement. Documented career progression/development frameworks assist in retaining key talent by setting clear paths for employees to grow their careers and reach their goals.'),
       ('Awards', 'Does your organisaiton comply with the Awards requirements?', 8,
        'Awards (modern awards) are legal documents that outline the minimum pay rates and conditions of employment. There are more than 100 industry or occupation awards that cover most people who work in Australia. Ensuring that you correctly classify your employees is critical to remaining compliant as an employer.'),
       ('Salaries', 'Does your organisation have a salary structure process?', 8,
        'Employee salaries should be determined based on an employee’s role and responsibilities, standards in the industry and the current market rate for similar positions. Job descriptions can help to determine a fair wage. Benchmarking should be performed against similar roles based on job requirements, industry pay standards, company size, other employee benefits and geographic location. Companies should have a salary structure in order to ensure equity between different roles and levels within the organisation. Upper and lower salary limits offered to new recruits can be based on the organisation’s salary structure.'),
       ('Pay Reviews', 'Does your organisation conduct regular pay reviews?', 8,
        'Regular employee pay reviews ensure that employees'' salaries continue to be competitive in the market, which is important to employee retention. Salary reviews are a tool which can be used to enhance employee motivation and engagement and to recognise high performers. There are a few intervals when employee pay reviews should occur, these include: ● when employees take on new responsibility ● after receiving new job specific qualifications or developing new skill-sets ● during performance review processes ● at least annually to reflect CPI adjustments.'),
       ('Employee Benefits', 'Does your organisation have an employee benefits program?', 8,
        'Employee benefits programs can help organisations to attract the best talent when recruiting. Employee benefits programs can show employees your appreciation which can improve employee engagement, job satisfaction and business culture. These benefits can help with employee retention.'),
       ('Employee Value Proposition (EVP)', 'Does your organisation have an Employee value proposition?', 8,
        'Organisations should have a robust and thought out Employee Value Proposition to strengthen employee retention and attraction. An EVP provides employees with a comprehensive understanding of the perks and benefits of working for your organisation, and plays a central role in distilling motivation. Organisational values can be driven through the offerings included within the EVP. Your EVP should be integrated within all aspects of your organisation.'),
       ('Values', 'Does your organisation have clear organisational values?', 9,
        'Having a set of clear organisational values help an organisation attract the right people (employees, customers, contractors, vendors) and increase the engagement of employees. Organisational values should be embedded throughout the organisation through regular communication with employees regarding the values, onboarding training sessions, value shares and a reflection of the values in employee goal setting / job descriptions and performance review procedures.'),
       ('Employee Engagement', 'Do you have a process to measure employee enagagement?', 9,
        'Employee engagement is essential to achieving organisational success and developing employee skills and talent so an organisation can achieve its goals. Measuring engagement and satisfaction in real time allows employers to promptly respond and adjust their initiatives and approach, before issues or employee dissatisfaction continues for a significant period of time. Disengaged employees can become unmotivated and unproductive, which may result in higher turnover.'),
       ('Employee Engagement Metrics', 'Does your organisation conduct regular employee engagement surveys?', 9,
        'Organisations should conduct regular employee engagement surveys in order to accurately measure the motivation and satisfaction of the staff members, and should be conducted on an annual basis. Attitudes and insights gained from the survey can serve as the foundation of people strategies and incentives. The data and metrics gathered should be used to develop future strategies to maximise people impact.'),
       ('Flexibility', 'Does your organisation have a flexible work arrangment policy?', 9,
        'Flexibility as a benefit to employees can help attract and retain a more skilled and diverse workforce. Flexibility can lead to lower absenteeism, higher job satisfaction, better staff morale and engagement and lower recruitment costs.'),
       ('HR Contractors/Services', 'Does your organisation outsource specialised services?', 9,
        'People are the key to any business and drive commercial outcomes. Organisations may choose to outsource some aspects of their HR Management practices to free up time to focus on other business priorities. However, organisations choosing to outsource need to have a focused HR strategy which allows them to retain control, manage culture and engagement and retain ownership of their data.'),
       ('HR Costs', 'Does your organisation measure and track HR costs?', 9,
        'Measure and tracking HR costs helps to measure impact and overall success of any people initiatives rolled out in the business. Having a detailed understanding of the HR and people related costs in a business, allows management to predict future costs and calculate return on investment.'),
       ('HRIS Platform', 'Does your organisation have a Human Resources System (HRIS) ?', 10,
        'Organisations should have a Human Resources Information System (HRIS) implemented within the business in order to ensure a seamless database of employee records, payroll details, annual review, employee demographics, onboarding, time tracking, etc. HRIS'' provide an organisation with a central platform of live people related data. It is critical that system integration across the platforms (if not housed in one central HRIS) is ensured so employees are paid appropriately and in order to maintain data integrity.'),
       ('Data Security', 'Does your organisation have a secure data storage location?', 10,
        'Employee records should be kept up to date and secure. Access to employee records should be limited to essential users only. Access should be removed when individuals leave the business, their role changes or if information is no longer relevant to them.'),
       ('Employee Records', 'Does your organisation keep accurate and up to date employee records?', 10,
        'Organisations should keep accurate and up to date employee records including: ● Contact information ● Emergency contact details ● Health/medical details the employee may have chosen to share ● Employment commencement dates ● Contracts or written agreements between the employer and employee ● Pay records including rate, gross amounts, deductions, details of bonuses, commissions, loading, penalty rates, etc ● Hours of work records ● Leave records ● Superannuation guarantee contributions records including dates, periods, funds contributed to and employee elections made ● Individual flexibility agreement records ● Annualised wage agreement records ● Guarantee of annual earnings records ● Termination records ● Transfer of business records'),
       ('Contractors Data', 'Does your organisation have a procedure for managing contractors data?', 10,
        'Organisations should keep records relating to payments made to contractors. The records that should be kept include any contracts or written agreements, invoices issued and received, amounts paid, payment summaries issued, superannuation payments, voluntary requests made by contractors to withhold tax amount and tax withheld from payments if a contractor does not provide their ABN. Contractor records should be securely stored with access limited to relevant users only.'),
       ('People Metrics', 'Does your organisation measure HR statistics?', 11,
        'Organisations measure statistics such as employee turnover, absenteeism, time to hire, culture, employee engagement, number of settlements or current employee claims. These statistics are monitored and tracked to identify trends and gain insights.'),
       ('HR Reporting', 'Does your organisation have a framework to measure HR analytics?', 11,
        'Organisations operating at best practice measure and track HR analytics to monitor and assess the effectiveness of HR initiatives and practices within their business. These organisations use HR analytics to drive decision making and are focused on continual improvement of their HR practices and people experience and recognise the commercial benefits this can achieve.'),
       ('Risk Processes and Procedures', 'Does your organisation have a risk process and procedure in place?', 12,
        'Employers can be held vicariously liable for any harm that is experienced within or at the workplace. The organisation should have robust processes and policies in place to ensure all employees and other persons are safe from harm. The organisation should implement policies and processes that align to state and national legislation.'),
       ('WHS Contact', 'Does your orgnanisation have a WHS officer?', 12,
        'The role of a WHS contact within an organisation ensures your organisation is operating in a compliant manner, and supports the implementation of processes and procedures supporting WHS. It is paramount that the operational guidelines relied upon are relevant, readily available, contemporary and effective. This role is responsible for the communication, implementation and monitoring of the processes and policies within the organisation. In addition to this, all employees have a responsibility to ensure they conduct their roles and responsibilities in a compliant manner that abides by the processes and policies implemented.'),
       ('Legislation Updates', 'Is your organisation WHS compliant with legislation?', 12,
        'Part of the WHS contacts’ role is to keep up to date with legislative requirements through regular monitoring of state and national based legislative bodies, compliance seminars, and interaction with relevant newsletters and associations. While the WHS contact is responsible operationally for the management of legislation updates, ultimately the Employer is vicariously liable'),
       ('Resources', 'Does your organisation provide WHS training and access to resources for all employees?', 12,
        'Organisations are lawfully required to provide all employees and contractors with access to any relevant resources relating to Workplace, Health and Safety. Administrative controls should be implemented to minimise employee exposure to risk. Organisations should facilitate regular training and development sessions in order to ensure employees are aware of the current processes and policies implemented to mitigate exposure to risks within the workplace.');

INSERT INTO QuestionSet (name)
VALUES ('Standard Question Set 1');
INSERT INTO QuestionSetDetail (question_id, question_set_id, weight)
VALUES (1, 1, 1),
       (2, 1, 1),
       (3, 1, 1),
       (4, 1, 1),
       (5, 1, 1),
       (6, 1, 1),
       (7, 1, 1),
       (8, 1, 1),
       (9, 1, 1),
       (10, 1, 1),
       (11, 1, 1),
       (12, 1, 1),
       (13, 1, 1),
       (14, 1, 1),
       (15, 1, 1),
       (16, 1, 1),
       (17, 1, 1),
       (18, 1, 1),
       (19, 1, 1),
       (20, 1, 1),
       (21, 1, 1),
       (22, 1, 1),
       (23, 1, 1),
       (24, 1, 1),
       (25, 1, 1),
       (26, 1, 1),
       (27, 1, 1),
       (28, 1, 1),
       (29, 1, 1),
       (30, 1, 1),
       (31, 1, 1),
       (32, 1, 1),
       (33, 1, 1),
       (34, 1, 1),
       (35, 1, 1),
       (36, 1, 1),
       (37, 1, 1),
       (38, 1, 1),
       (39, 1, 1),
       (40, 1, 1),
       (41, 1, 1),
       (42, 1, 1),
       (43, 1, 1),
       (44, 1, 1),
       (45, 1, 1),
       (46, 1, 1),
       (47, 1, 1),
       (48, 1, 1),
       (49, 1, 1),
       (50, 1, 1),
       (51, 1, 1),
       (52, 1, 1),
       (53, 1, 1),
       (54, 1, 1),
       (55, 1, 1),
       (56, 1, 1),
       (57, 1, 1),
       (58, 1, 1),
       (59, 1, 1),
       (60, 1, 1),
       (61, 1, 1);


-- Optional Data
-- Survey
INSERT INTO Survey (name, principal, industry_id, company_name, headcount, description,
                    status, previous_status, question_set_id, link)
VALUES ('SAGI GAMES 1st test', 'Sara Villella', 8, 'SAGI GAMES', 100, 'Muen is resigned from there', 0, 1, null,
        '1a3c06c0e722a03b8ededb675f95d7e8a22f4135c3ad6d41ab01fb6b83e5ceb1');
INSERT INTO Response (question_id, survey_id)
values (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 1),
       (7, 1),
       (8, 1),
       (9, 1),
       (10, 1),
       (11, 1),
       (12, 1),
       (13, 1),
       (14, 1),
       (15, 1),
       (16, 1),
       (17, 1),
       (18, 1),
       (19, 1),
       (20, 1),
       (21, 1),
       (22, 1),
       (23, 1),
       (24, 1),
       (25, 1),
       (26, 1),
       (27, 1),
       (28, 1),
       (29, 1),
       (30, 1),
       (31, 1),
       (32, 1),
       (33, 1),
       (34, 1),
       (35, 1),
       (36, 1),
       (37, 1),
       (38, 1),
       (39, 1),
       (40, 1),
       (41, 1),
       (42, 1),
       (43, 1),
       (44, 1),
       (45, 1),
       (46, 1),
       (47, 1),
       (48, 1),
       (49, 1),
       (50, 1),
       (51, 1),
       (52, 1),
       (53, 1),
       (54, 1),
       (55, 1),
       (56, 1),
       (57, 1),
       (58, 1),
       (59, 1),
       (60, 1),
       (61, 1);