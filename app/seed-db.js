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
                insert into Admin (email,name,phone,pw)  values('Steve','steve@hotmail.com','6042828283','iamsteve');
                insert into Admin (email,name,phone,pw) values('Louis','louis@hotmail.com','6041112222','iamlouis');
                insert into Admin (email,name,phone,pw) values('cinda','cinda@hotmail.com','6046782534','iamcinda');
                insert into Admin (email,name,phone,pw) values('Mary','mary@hotmail.com','6046397485','iammary');
                insert into Admin (email,name,phone,pw) values('Ben','ben@hotmail.com','60467363643','iamben');
                insert into Admin (email,name,phone,pw) values('Pheobe','pheobe@hotmail.com','6048737489','iampheobe');
                insert into Admin (email,name,phone,pw) values('Monica','monica@hotmail.com','6040987653','iammonica');
                insert into Admin (email,name,phone,pw) values('Ross','ross@hotmail.com','6045637485','iamross');
                insert into Admin (email,name,phone,pw) values('Chandler','chandler@hotmail.com','6046729874','iamchandler');
                insert into Admin (email,name,phone,pw) values('Joey','joey@hotmail.com','60426859867','iamjoey');
                
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
                insert into Program  values(1, 'Anesthesiology',  10);
                insert into Program  values(2, 'Dermatology',  3);
                insert into Program  values(3, 'Emergency Medicine',  7);
                insert into Program  values(4, 'Family Medicine',  1);
                insert into Program  values(5, 'General Surgery',  6);
                insert into Program  values(6, 'Internal Medicine',  6);
                insert into Program  values(7, 'Interventional Radiology',  3);
                insert into Program  values(8, 'Neurology',  5);
                insert into Program  values(9, 'Neurosurgery',  2);
                insert into Program  values(10, 'Ophthalmology',  9);
                insert into Program  values(1, 'General Surgery',  5);
                insert into Program  values(3, 'Internal Medicine',  2);
                insert into Program  values(3, 'Family Medicine',  4);
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
                insert into VacancyPosting (recruiterEmail,pname,duration,specialty,deadline) values('adams@gmail.com', 'Anesthesiology', '3 years', 'Anesthesiology', '2017-02-23');
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('baker@gmail.com', 'Dermatology', '4 years', 'Dermatology', '2017-04-23'); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('davis@gmail.com', 'Emergency Medicine', '3 years', 'Emergency Medicine', '2017-05-23'); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('frank@gmail.com', 'Family Medicine', '2 years', 'Family Medicine', '2017-08-23');
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('clark@gmail.com', 'General Surgery', '3 years', 'General Surgery', '2017-10-23'); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('mason@gmail.com', 'Internal Medicine', '4 years', 'Internal Medicine', '2017-11-23');
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('patel@gmail.com', 'Interventional Radiology', '5 years', 'Interventional Radiology','2017-08-23'); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('smith@gmail.com', 'Neurology', '3 years', 'Neurology', '2017-10-23'); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('white@gmail.com', 'Neurosurgery', '3 years', 'Neurosurgery', '2017-08-23');
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('lopez@gmail.com', 'Ophthalmology', '4 years', 'Ophthalmology', '2017-10-23'); 
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('adams@gmail.com', 'General Surgery', '3 years', 'General Surgery','2017-03-23');  
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('davis@gmail.com', 'Internal Medicine', '4 years', 'Internal Medicine', '2017-06-23');
                insert into VacancyPosting  (recruiterEmail,pname,duration,specialty,deadline) values('davis@gmail.com', 'Family Medicine', '2 years', 'Family Medicine', '2017-07-23');  
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
                insert into ResidencyCandidate  values('Jason', 'Dermatology', 'employed', 'jason@gmail.com', '7782548237','cvsddf'); 
                insert into ResidencyCandidate  values('Ama', 'Internal Medicine', 'employed', 'ama@gmail.com', '7785879032','sdfcx'); 
                insert into ResidencyCandidate  values('Linda', 'Neurosurgery', 'employed', 'linda@gmail.com', '77825786902','jkljk,'); 
                insert into ResidencyCandidate  values('Jasmine', 'Emergency Medicine', 'employed', 'jasmine@gmail.com', '7785647849','utytgg'); 
                insert into ResidencyCandidate  values('Kristy', 'Anesthesiology', 'employed', 'kristy@gmail.com', '7785678598','nmbhj'); 
                insert into ResidencyCandidate  values('Mengmeng', 'Interventional Radiology', 'employed', 'meng@gmail.com', '7784657482','iammeng'); 
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
                insert into Application (form1path,form2path) values('Mark/resume.pdf', 'Mark/transcript.pdf');
                insert into Application (form1path,form2path) values('Dan/resume.pdf', 'Dan/transcript.pdf');
                insert into Application (form1path,form2path) values('Susan/resume.pdf', 'Susan/transcript.pdf');
                insert into Application (form1path,form2path) values('Jason/resume.pdf', 'Jason/transcript.pdf');
                insert into Application (form1path,form2path) values('Ama/resume.pdf', 'Linda/transcript.pdf');
                insert into Application (form1path,form2path) values('Linda/resume.pdf', 'Lindatranscript.pdf');
                insert into Application (form1path,form2path) values('Jasmine/resume.pdf', 'Jasmine/transcript.pdf');
                insert into Application (form1path,form2path) values('Kristy/resume.pdf', 'Kristy/transcript.pdf');
                insert into Application (form1path,form2path) values('Mengmeng/resume.pdf', 'Mengmeng/transcript.pdf');
                insert into Application (form1path,form2path) values('Terry/resume.pdf', 'Terry/transcript.pdf');
                insert into Application (form1path,form2path) values('Jack/resume.pdf', 'Jack/transcript.pdf');
                insert into Application (form1path,form2path) values('Gary/resume.pdf', 'Gary/transcript.pdf');
                insert into Application (form1path,form2path) values('Lisa/resume.pdf', 'Lisa/transcript.pdf');
                insert into Application (form1path,form2path) values('Joe/resume.pdf', 'Joe/transcript.pdf');
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
                insert into Applies  values('mark@gmail.com', 4, '2017-07-28', 1); 
                insert into Applies  values('mark@gmail.com', 13, '2017-07-15', 1); 
                insert into Applies  values('dan@gmail.com', 5, '2017-09-28', 2); 
                insert into Applies  values('dan@gmail.com', 11, '2017-02-28', 2); 
                insert into Applies  values('susan@gmail.com', 8, '2017-10-15', 3);
                insert into Applies  values('jason@gmail.com', 2, '2017-04-17', 4);
                insert into Applies  values('ama@gmail.com', 6, '2017-12-03', 5);
                insert into Applies  values('ama@gmail.com', 12, '2017-06-04', 5);
                insert into Applies  values('linda@gmail.com', 9, '2017-08-25', 6);
                insert into Applies  values('Jasmine@gmail.com', 3, '2017-04-28', 7);
                insert into Applies  values('kristy@gmail.com', 1, '2017-01-22', 8);
                insert into Applies  values('meng@gmail.com', 7, '2017-08-15', 9);
                insert into Applies  values('terry@gmail.com', 10, '2017-09-28', 10);
                insert into Applies  values('jack@gmail.com', 10, '2017-09-30', 11);
                insert into Applies  values('gary@gmail.com', 4, '2017-08-01', 12);
                insert into Applies  values('gary@gmail.com', 13, '2017-07-11', 12);
                insert into Applies  values('lisa@gmail.com', 7, '2017-08-17', 13);
                insert into Applies  values('Joe@gmail.com', 8, '2017-10-20', 14);
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
                insert into Interviews  values(1,'mark@gmail.com', 4, '2017-09-10', 'Boyle'); 
                insert into Interviews  values(1,'mark@gmail.com', 13, '2017-08-10', 'Black Diamond'); 
                insert into Interviews  values(2,'mark@gmail.com', 13, '2017-08-20', 'Black Diamond'); 
                insert into Interviews  values(1,'dan@gmail.com', 5, '2017-11-05', 'Calgary');
                insert into Interviews  values(1,'dan@gmail.com', 11, '2017-03-05', 'Athabasca');  
                insert into Interviews  values(1,'susan@gmail.com', 8, '2017-12-01', 'Edmonton');
                insert into Interviews  values(1,'jason@gmail.com', 2, '2017-05-12', 'Banff');
                insert into Interviews  values(1,'ama@gmail.com', 6, '2017-11-01', 'Calgary');
                insert into Interviews  values(1,'ama@gmail.com', 12, '2017-07-01', 'Black Diamond');
                insert into Interviews  values(1,'linda@gmail.com', 9, '2017-08-27', 'Edmonton');
                insert into Interviews  values(1,'jasmine@gmail.com', 3, '2017-06-08', 'Black Diamond');
                insert into Interviews  values(1,'kristy@gmail.com', 1, '2017-03-18', 'Athabasca');
                insert into Interviews  values(1,'meng@gmail.com', 7, '2017-09-15', 'Cardston');
                insert into Interviews  values(1,'terry@gmail.com', 10, '2017-11-05', 'Edmonton');
                insert into Interviews  values(1,'jack@gmail.com', 10, '2017-11-05', 'Edmonton');
                insert into Interviews  values(1,'gary@gmail.com', 4, '2017-09-10', 'Boyle'); 
                insert into Interviews  values(2,'gary@gmail.com', 13, '2017-08-20', 'Black Diamond'); 
                insert into Interviews  values(1,'lisa@gmail.com', 7, '2017-09-15', 'Cardston');
                insert into Interviews  values(1,'joe@gmail.com', 8, '2017-12-01', 'Edmonton');

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
                insert into H_interviews_for_posting values(1,1);
                insert into H_interviews_for_posting values(2,2);
                insert into H_interviews_for_posting values(3,3);
                insert into H_interviews_for_posting values(4,4);
                insert into H_interviews_for_posting values(5,5);
                insert into H_interviews_for_posting values(6,6);
                insert into H_interviews_for_posting values(7,7);
                insert into H_interviews_for_posting values(8,8);
                insert into H_interviews_for_posting values(9,9);
                insert into H_interviews_for_posting values(10,10);
                insert into H_interviews_for_posting values(11,1);
                insert into H_interviews_for_posting values(12,3);
                insert into H_interviews_for_posting values(13,3);

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
                insert into H_ranks  values(3,'mark@gmail.com', 2); 
                insert into H_ranks  values(4,'mark@gmail.com', 1); 
                insert into H_ranks  values(5,'dan@gmail.com', 1); 
                insert into H_ranks  values(1,'dan@gmail.com', 1); 
                insert into H_ranks  values(8,'susan@gmail.com', 1);
                insert into H_ranks  values(2,'jason@gmail.com', 1);
                insert into H_ranks  values(6,'ama@gmail.com', 1);
                insert into H_ranks  values(3,'ama@gmail.com', 1);
                insert into H_ranks  values(9,'linda@gmail.com', 1);
                insert into H_ranks  values(3,'jasmine@gmail.com', 1);
                insert into H_ranks  values(1,'kristy@gmail.com', 1);
                insert into H_ranks  values(7,'meng@gmail.com', 1);
                insert into H_ranks  values(10,'terry@gmail.com', 1);
                insert into H_ranks  values(10,'jack@gmail.com', 2);
                insert into H_ranks  values(3,'gary@gmail.com', 1); 
                insert into H_ranks  values(4,'gary@gmail.com', 2); 
                insert into H_ranks  values(7,'lisa@gmail.com', 2);
                insert into H_ranks  values(8,'joe@gmail.com', 2);

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
                insert into R_ranks  values('mark@gmail.com', 3, 1); 
                insert into R_ranks  values('mark@gmail.com', 4, 2); 
                insert into R_ranks  values('dan@gmail.com', 5, 1); 
                insert into R_ranks  values('dan@gmail.com', 1, 2); 
                insert into R_ranks  values('susan@gmail.com', 8, 1);
                insert into R_ranks  values('jason@gmail.com', 2, 1);
                insert into R_ranks  values('ama@gmail.com', 6, 1);
                insert into R_ranks  values('ama@gmail.com', 3, 2);
                insert into R_ranks  values('linda@gmail.com', 9, 1);
                insert into R_ranks  values('jasmine@gmail.com', 3, 1);
                insert into R_ranks  values('kristy@gmail.com', 1, 1);
                insert into R_ranks  values('meng@gmail.com', 7, 1);
                insert into R_ranks  values('terry@gmail.com', 10, 1);
                insert into R_ranks  values('jack@gmail.com', 10, 1);
                insert into R_ranks  values('gary@gmail.com', 4, 1); 
                insert into R_ranks  values('gary@gmail.com', 3, 2); 
                insert into R_ranks  values('lisa@gmail.com', 7, 1);
                insert into R_ranks  values('joe@gmail.com', 8, 1);

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
                insert into Offers  values(4, 'mark@gmail.com', 4, 'accepted'); 
                insert into Offers  values(5, 'dan@gmail.com', 5, 'accepted'); 
                insert into Offers  values(11, 'dan@gmail.com', 1, 'declined'); 
                insert into Offers  values(8, 'susan@gmail.com', 8, 'accepted');
                insert into Offers  values(2, 'jason@gmail.com', 2, 'accepted');
                insert into Offers  values(6, 'ama@gmail.com', 6, 'accepted');
                insert into Offers  values(12, 'ama@gmail.com', 3, 'declined');
                insert into Offers  values(9, 'linda@gmail.com', 9, 'accepted');
                insert into Offers  values(3, 'jasmine@gmail.com', 3, 'accepted');
                insert into Offers  values(1, 'kristy@gmail.com', 1, 'accepted');
                insert into Offers  values(7, 'meng@gmail.com', 7, 'accepted');
                insert into Offers  values(10, 'terry@gmail.com', 10, 'accepted');
                insert into Offers  values(13, 'gary@gmail.com', 3, 'accepted');  

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
                insert into Contract  values(4, 'mark@gmail.com', 4, 50000); 
                insert into Contract  values(5, 'dan@gmail.com', 5, 55000); 
                insert into Contract  values(8, 'susan@gmail.com', 8, 57000);
                insert into Contract  values(2, 'jason@gmail.com', 2, 52000);
                insert into Contract  values(6, 'ama@gmail.com', 6, 55000);
                insert into Contract  values(9, 'linda@gmail.com', 9, 58000);
                insert into Contract  values(3, 'jasmine@gmail.com', 3, 51000);
                insert into Contract  values(1, 'kristy@gmail.com', 1, 65000);
                insert into Contract  values(7, 'meng@gmail.com', 7, 59000);
                insert into Contract  values(10, 'terry@gmail.com', 10, 58000);
                insert into Contract  values(13, 'gary@gmail.com', 3, 52000);

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