/**
 * Created by kristys on 2017-10-23.
 */
module.exports = function () {
    const connection = require('./connection');
    const async = require('async');

    async.waterfall([
        function (callback) {
            connection.query(
                `
                insert into Admin (name,email, phone,pw) values('Steve','steve@hotmail.com','6042828283','iamsteve');
                insert into Admin (name,email, phone,pw) values('Louis','louis@hotmail.com','6041112222','iamlouis');
                insert into Admin (name,email, phone,pw) values('cinda','cinda@hotmail.com','6046782534','iamcinda');
                insert into Admin (name,email, phone,pw) values('Mary','mary@hotmail.com','6046397485','iammary');
                insert into Admin (name,email, phone,pw) values('Ben','ben@hotmail.com','60467363643','iamben');
                insert into Admin (name,email, phone,pw) values('Pheobe','pheobe@hotmail.com','6048737489','iampheobe');
                insert into Admin (name,email, phone,pw) values('Monica','monica@hotmail.com','6040987653','iammonica');
                insert into Admin (name,email, phone,pw) values('Ross','ross@hotmail.com','6045637485','iamross');
                insert into Admin (name,email, phone,pw) values('Chandler','chandler@hotmail.com','6046729874','iamchandler');
                insert into Admin (name,email, phone,pw) values('Joey','joey@hotmail.com','60426859867','iamjoey');
                
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into Hospital (name,location) values('Athabasca Healthcare Center',  'Athabasca');
                insert into Hospital (name,location) values('Banff Mineral Springs Hospital',  'Banff');
                insert into Hospital (name,location) values('Oilfields General Hospital',  'Black Diamond');   
                insert into Hospital (name,location) values('Boyle Healthcare Centre',  'Boyle');   
                insert into Hospital (name,location) values('East Calgary Health Centre',  'Calgary');   
                insert into Hospital (name,location) values('South Calgary Health Centre',  'Calgary');   
                insert into Hospital (name,location) values('Cardston Hospital',  'Cardston');   
                insert into Hospital (name,location) values('Alberta Hospital Edmonton',  'Edmonton');   
                insert into Hospital (name,location) values('Cross Cancer Institute',  'Edmonton');   
                insert into Hospital (name,location) values('Devon General Hospital',  'Edmonton');
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into Recruiter  values('Adams', 1,'adams@gmail.com', '7786660000', 'iamadams'); 
                insert into Recruiter  values('Baker', 2, 'baker@gmail.com', '7786215656', 'iambaker'); 
                insert into Recruiter  values('Davis', 3, 'davis@gmail.com', '7786927852', 'iamdavis');  
                insert into Recruiter  values('Frank', 4, 'frank@gmail.com', '7786338900', 'iamfrank');  
                insert into Recruiter  values('Clark', 5, 'clark@gmail.com', '7784324321', 'iamclark');  
                insert into Recruiter  values('Mason', 6, 'mason@gmail.com', '7786456789', 'iammason');  
                insert into Recruiter  values('Patel', 7, 'patel@gmail.com', '7786227777', 'iampatel');  
                insert into Recruiter  values('Smith', 8, 'smith@gmail.com', '7786567456', 'iamsmith');  
                insert into Recruiter  values('White', 9, 'white@gmail.com', '7786343457', 'iamwhite');
                insert into Recruiter  values('Lopez', 10, 'lopez@gmail.com', '7786686456', 'iamlopez');
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into VacancyPosting (recruiterEmail,pname,duration,specialty,deadline,numslots) values('adams@gmail.com', 'Anesthesiology', '3 years', 'Anesthesiology', '2017-02-23',3);
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('baker@gmail.com', 'Dermatology', '4 years', 'Dermatology', '2017-04-23',2); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('davis@gmail.com', 'Emergency Medicine', '3 years', 'Emergency Medicine', '2017-05-23',5); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('frank@gmail.com', 'Family Medicine', '2 years', 'Family Medicine', '2017-08-23',1);
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('clark@gmail.com', 'General Surgery', '3 years', 'General Surgery', '2017-10-23',4); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('mason@gmail.com', 'Internal Medicine', '4 years', 'Internal Medicine', '2017-11-23',2);
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('patel@gmail.com', 'Interventional Radiology', '5 years', 'Interventional Radiology','2017-08-23',4); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('smith@gmail.com', 'Neurology', '3 years', 'Neurology', '2017-10-23',3); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('white@gmail.com', 'Neurosurgery', '3 years', 'Neurosurgery', '2017-08-23',7);
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('lopez@gmail.com', 'Ophthalmology', '4 years', 'Ophthalmology', '2017-10-23',2); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('adams@gmail.com', 'General Surgery', '3 years', 'General Surgery','2017-03-23',6);  
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('davis@gmail.com', 'Internal Medicine', '4 years', 'Internal Medicine', '2017-06-23',3);
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline,numslots) values('davis@gmail.com', 'Family Medicine', '2 years', 'Family Medicine', '2017-07-23',5);
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into ResidencyCandidate  values('Mark', 'Family Medicine', 'employed', 'mark@gmail.com', '778282399','iammark');
                insert into ResidencyCandidate  values('Dan', 'General Surgery', 'employed', 'dan@gmail.com', '7781231233','sdfd'); 
                insert into ResidencyCandidate  values('Susan', 'Neurology', 'employed', 'susan@gmail.com', '778647283','affds'); 
                insert into ResidencyCandidate  values('Jason', 'Dermatology', 'employed', 'jason@gmail.com', '7782548237','iamjason'); 
                insert into ResidencyCandidate  values('Ama', 'Internal Medicine', 'employed', 'ama@gmail.com', '7785879032','iamama'); 
                insert into ResidencyCandidate  values('Linda', 'Neurosurgery', 'employed', 'linda@gmail.com', '77825786902','iamlinda,'); 
                insert into ResidencyCandidate  values('Jasmine', 'Emergency Medicine', 'employed', 'jasmine@gmail.com', '7785647849','iamjasmine'); 
                insert into ResidencyCandidate  values('Kristy', 'Anesthesiology', 'employed', 'kristy@gmail.com', '7785678598','iamkristy'); 
                insert into ResidencyCandidate  values('Mengmeng', 'Interventional Radiology', 'employed', 'meng@gmail.com', '7784657482','iammengmeng'); 
                insert into ResidencyCandidate  values('Terry', 'Ophthalmology', 'employed', 'terry@gmail.com', '7786758595','iamterry'); 
                insert into ResidencyCandidate  values('Jack', 'Ophthalmology', 'unemployed', 'jack@gmail.com', '7786748395','iamjack'); 
                insert into ResidencyCandidate  values('Gary', 'Family Medicine', 'employed', 'gary@gmail.com', '7786754848','iamgary'); 
                insert into ResidencyCandidate  values('Lisa', 'Interventional Radiology', 'unemployed', 'lisa@gmail.com', '7785474848','iamlisa'); 
                insert into ResidencyCandidate  values('Joe', 'Neurology', 'unemployed', 'joe@gmail.com', '7786329432','iamjoe'); 
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into Application (resEmail,postingID,docPath,time) values('mark@gmail.com', 4, 'Mark/package.zip','2017-07-28'); 
                insert into Application (resEmail,postingID,docPath,time) values('mark@gmail.com', 13, 'Mark/package.zip','2017-07-15'); 
                insert into Application (resEmail,postingID,docPath,time) values('dan@gmail.com', 5, 'Dan/package.zip','2017-09-28'); 
                insert into Application (resEmail,postingID,docPath,time) values('dan@gmail.com', 11, 'Dan/package.zip','2017-02-28'); 
                insert into Application (resEmail,postingID,docPath,time) values('susan@gmail.com', 8, 'Susan/package.zip','2017-10-15');
                insert into Application (resEmail,postingID,docPath,time) values('jason@gmail.com', 2, 'Jason/package.zip','2017-04-17');
                insert into Application (resEmail,postingID,docPath,time) values('ama@gmail.com', 6, 'Ama/package.zip','2017-12-03');
                insert into Application (resEmail,postingID,docPath,time) values('ama@gmail.com', 12, 'Ama/package.zip','2017-06-04');
                insert into Application (resEmail,postingID,docPath,time) values('linda@gmail.com', 9, 'Lindapackage.zip','2017-08-25');
                insert into Application (resEmail,postingID,docPath,time) values('Jasmine@gmail.com', 3, 'Jasmine/package.zip','2017-04-28');
                insert into Application (resEmail,postingID,docPath,time) values('kristy@gmail.com', 1, 'Kristy/package.zip','2017-01-22');
                insert into Application (resEmail,postingID,docPath,time) values('meng@gmail.com', 7, 'Mengmeng/package.zip','2017-08-15');
                insert into Application (resEmail,postingID,docPath,time) values('terry@gmail.com', 10, 'Terry/package.zip','2017-09-28');
                insert into Application (resEmail,postingID,docPath,time) values('jack@gmail.com', 10, 'Jack/package.zip','2017-09-30');
                insert into Application (resEmail,postingID,docPath,time) values('gary@gmail.com', 4, 'Gary/package.zip','2017-08-01');
                insert into Application (resEmail,postingID,docPath,time) values('gary@gmail.com', 13, 'Gary/package.zip','2017-07-11');
                insert into Application (resEmail,postingID,docPath,time) values('lisa@gmail.com', 7,'Lisa/package.zip', '2017-08-17');
                insert into Application (resEmail,postingID,docPath,time) values('Joe@gmail.com', 8, 'Joe/package.zip','2017-10-20');
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into Interview  values(1, 1, '2017-09-10', 'Boyle'); 
                insert into Interview  values(1, 2, '2017-08-10', 'Black Diamond'); 
                insert into Interview  values(2, 1, '2017-08-20', 'Black Diamond'); 
                insert into Interview  values(1, 3, '2017-11-05', 'Calgary');
                insert into Interview  values(1, 4, '2017-03-05', 'Athabasca');  
                insert into Interview  values(1, 5, '2017-12-01', 'Edmonton');
                insert into Interview  values(1, 6, '2017-05-12', 'Banff');
                insert into Interview  values(1, 7, '2017-11-01', 'Calgary');
                insert into Interview  values(1, 8, '2017-07-01', 'Black Diamond');
                insert into Interview  values(1, 9, '2017-08-27', 'Edmonton');
                insert into Interview  values(1, 10, '2017-06-08', 'Black Diamond');
                insert into Interview  values(1, 11, '2017-03-18', 'Athabasca');
                insert into Interview  values(1, 12, '2017-09-15', 'Cardston');
                insert into Interview  values(1, 13, '2017-11-05', 'Edmonton');
                insert into Interview  values(1, 14, '2017-11-05', 'Edmonton');
                insert into Interview  values(1, 15, '2017-09-10', 'Boyle'); 
                insert into Interview  values(1, 16, '2017-08-20', 'Black Diamond'); 
                insert into Interview  values(1, 17, '2017-09-15', 'Cardston');
                insert into Interview  values(1, 18, '2017-12-01', 'Edmonton');

                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into School (name,province,city) values('University of British Columbia', 'British Columnbia', 'Vancouver');
                insert into School (name,province,city) values('Simon Fraser University', 'British Columnbia', 'Burnaby');
                insert into School (name,province,city) values('University of Toronto', 'Ontario', 'Toronto');
                insert into School (name,province,city) values('University of Waterloo', 'Ontario', 'Waterloo');
                insert into School (name,province,city) values('McGill University', 'Quebec', 'Montreal');
                insert into School (name,province,city) values('Concordia University', 'Quebec', 'Montreal');
                insert into School (name,province,city) values('York University', 'Ontario', 'Toronto');
                insert into School (name,province,city) values('University of Alberta','Alberta', 'Edmonton');
                insert into School (name,province,city) values('Carleton University', 'Ontario', 'Ottawa');
                insert into School (name,province,city) values('Western University', 'Ontario', 'London');

                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into CandidateAttended  values('mark@gmail.com', 2); 
                insert into CandidateAttended  values('dan@gmail.com', 8); 
                insert into CandidateAttended  values('dan@gmail.com', 3); 
                insert into CandidateAttended  values('susan@gmail.com', 7);
                insert into CandidateAttended  values('jason@gmail.com', 1);
                insert into CandidateAttended  values('ama@gmail.com', 5);
                insert into CandidateAttended  values('linda@gmail.com', 6);
                insert into CandidateAttended  values('jasmine@gmail.com', 3);
                insert into CandidateAttended  values('kristy@gmail.com', 9);
                insert into CandidateAttended  values('meng@gmail.com', 10);
                insert into CandidateAttended  values('meng@gmail.com', 1);
                insert into CandidateAttended  values('terry@gmail.com', 4);
                insert into CandidateAttended  values('jack@gmail.com', 2);
                insert into CandidateAttended  values('gary@gmail.com', 2);
                insert into CandidateAttended  values('lisa@gmail.com', 3);
                insert into CandidateAttended  values('joe@gmail.com', 7);
    
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                insert into Offers  values(4, 'mark@gmail.com', 55000, 'accepted'); 
                insert into Offers  values(5, 'dan@gmail.com', 52000, 'accepted'); 
                insert into Offers  values(11, 'dan@gmail.com', 61000, 'declined'); 
                insert into Offers  values(8, 'susan@gmail.com', 57000, 'accepted');
                insert into Offers  values(2, 'jason@gmail.com', 58000, 'accepted');
                insert into Offers  values(6, 'ama@gmail.com', 55500, 'accepted');
                insert into Offers  values(12, 'ama@gmail.com', 50000, 'declined');
                insert into Offers  values(9, 'linda@gmail.com', 53200, 'accepted');
                insert into Offers  values(3, 'jasmine@gmail.com', 56000, 'accepted');
                insert into Offers  values(1, 'kristy@gmail.com', 53000, 'accepted');
                insert into Offers  values(7, 'meng@gmail.com', 55000, 'accepted');
                insert into Offers  values(10, 'terry@gmail.com', 58000, 'accepted');
                insert into Offers  values(13, 'gary@gmail.com', 59000, 'accepted');  


                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        }
    ], function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        return console.log('Database has been seeded successfully');
    });
};