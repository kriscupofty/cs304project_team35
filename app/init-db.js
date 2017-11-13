const connection = require('./connection');
const async = require('async');

async.waterfall([
    function (callback) {
        connection.query(
            `create table Admin (
	            email	       	varchar(30),
	            name				varchar(30) not null,
                phone				varchar(30) unique,
                pw           		varchar(30) not null,
                primary key (email)
            );`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table Hospital (
	            hID	       int(11) unsigned auto_increment,
                name       varchar(30) unique not null,
                location   varchar(30),
                primary key (hID)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table Recruiter (
                name				    varchar(30) not null,
	             hID	       			int(11) unsigned not null,
                email               varchar(30),
                phone        		varchar(30) unique,
                pw       			varchar(30) not null,
                primary key (email),
                foreign key (hID) references Hospital(hID)
                on delete cascade
                on update cascade
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table VacancyPosting (
	            postingID		int(11) unsigned auto_increment,
                recruiterEmail	varchar(30) not null,
                pname           varchar(50) not null,
                numslots		integer,
                duration        varchar(30) not null,
                specialty       varchar(50) not null,
                deadline		date not null,
                primary key (postingID),
                foreign key (recruiterEmail) references Recruiter(email)
	            on delete cascade
                on update cascade
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table ResidencyCandidate (
                name	          varchar(30) not null,
                specialty	       varchar(50) not null,
                employmentStatus	varchar(30),
                email           varchar(30),
                phone             varchar(30) unique,
                pw               varchar(30) not null,
                primary key (email)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table Application (
	            aID			int(11) unsigned auto_increment,
	            resEmail	varchar(30) not null,
                postingID	int(11) unsigned not null,
                docPath		varchar(50),
                time        date,
                primary key (aID),
                foreign key (resEmail) references ResidencyCandidate(email)
                on delete cascade
                on update cascade,
                foreign key (postingID) references VacancyPosting(postingID)
                on delete cascade
                on update cascade
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table Interview (
	            round		int(11) unsigned,
                aID			int(11) unsigned,
                time        date not null,
                location    varchar(30) not null,
                primary key (aID,round),
	            foreign key (aID) references Application(aID)
                on delete cascade
                on update cascade
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table School (
	            sid				int(11) unsigned auto_increment,
                name			varchar(50) not null,
                province			varchar(30),
                city			varchar(30),
                primary key (sid)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table CandidateAttended (
	            resEmail        varchar(30),
	            sid				int(11) unsigned,
                primary key (resEmail,sid),
	            foreign key (resEmail) references ResidencyCandidate(email)
                on delete cascade
                on update cascade,
	            foreign key (sid) references School(sid)
                on delete no action
                on update cascade
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table Offer (
                postingID		int(11) unsigned not null,
	            resEmail		varchar(30) not null,
                compensation	numeric(9,2),
                decision		varchar(30),
                primary key (resEmail,postingID,compensation),
                foreign key (resEmail) references ResidencyCandidate(email)
                on delete cascade
                on update cascade,
	            foreign key (postingID) references VacancyPosting(postingID)
	            on delete cascade
                on update cascade
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table H_rank (
                hID		int(11) unsigned,
                resEmail	varchar(30),
                 rank		integer not null,
                 primary key (hID, resEmail),
                 foreign key (hID) references Hospital(hID)
                 on delete cascade
                on update cascade,
                 foreign key (resEmail) references ResidencyCandidate(email)
                 on delete cascade
                 on update cascade
             )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table R_rank (
                 resEmail	varchar(30),
 	            hID		int(11) unsigned,
                 rank		integer not null,
                 primary key (resEmail,hID),
                 foreign key (resEmail) references ResidencyCandidate(email)
                 on delete cascade
                 on update cascade,
                 foreign key (hID) references Hospital(hID)
                 on delete cascade
                 on update cascade
             )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE VIEW OfferForAdmin (name, resEmail, postingID, hID, hospital, recruiterEmail, compensation, decision) AS 
                SELECT R.name, O.resEmail, O.postingID, Rec.hID, H.name, recruiterEmail, compensation, decision
                FROM Offer O, VacancyPosting V, Recruiter Rec, ResidencyCandidate R, Hospital H
                WHERE O.resEmail = R.email AND O.postingID = V.postingID AND Rec.hID = H.hID AND Rec.email = V.recruiterEmail`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    }

], function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Tables have been created');
    require('./seed-db.js')();
});
