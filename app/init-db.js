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
                name       varchar(30),
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
            `create table Program (
	            hID	       int(11) unsigned,
                pname      varchar(30),
                numslots   integer,
                primary key (hID, pname),
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
            `create table Recruiter (
                name				varchar(30) not null,
	            hID	       			int(11) unsigned not null,
                email      varchar(30),
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
            `create table RecruiterHospital (
                recruiterEmail	varchar(30),
                hID          	int(11) unsigned not null,
                primary key (recruiterEmail),
                foreign key (recruiterEmail) references Recruiter(email)
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
	            aID		int(11) unsigned auto_increment,
                form1path	varchar(30) not null,
                form2path	varchar(30) not null,
                primary key (aID)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table Applies (
	            resEmail	varchar(30),
                postingID	int(11) unsigned,
                time        date,
                aID			int(11) unsigned not null,
                primary key (resEmail, postingID, time),
                foreign key (resEmail) references ResidencyCandidate(email)
                on delete cascade
                on update cascade,
                foreign key (postingID) references VacancyPosting(postingID)
                on delete cascade
                on update cascade,
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
            `create table Interviews (
	            round		integer,
	            resEmail      varchar(30),
                postingID	int(11) unsigned,
                time        date not null,
                location    varchar(30) not null,
                primary key (round, resEmail,postingID),
	            foreign key (postingID) references VacancyPosting(postingID)
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
            `create table H_interviews_for_posting (
                postingID	int(11) unsigned,
                hID      int(11) unsigned not null,
                primary key (postingID),
	            foreign key (postingID) references VacancyPosting(postingID)
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
                primary key (resEmail,sid)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table H_ranks (
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
            `create table R_ranks (
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
            `create table Offers (
                postingID		int(11) unsigned,
	            resEmail		varchar(30),
	            hID				int(11) unsigned,
                decision		varchar(30) not null,
                primary key (postingID,resEmail),
                foreign key (resEmail) references ResidencyCandidate(email)
                on delete cascade
                on update cascade,
                foreign key (postingID) references VacancyPosting(postingID)
	            on delete cascade
                on update cascade,
                foreign key (hID) references Hospital(hID)
	            on delete set null
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
            `create table Contract (
                postingID		int(11) unsigned,
	            resEmail		varchar(30),
	            hID				int(11) unsigned,
                compensation	numeric(9,2) not null,
                primary key (postingID,resEmail),
                foreign key (resEmail) references ResidencyCandidate(email)
                on delete cascade
                on update cascade,
                foreign key (postingID) references VacancyPosting(postingID)
	            on delete cascade
                on update cascade,
                foreign key (hID) references Hospital(hID)
	            on delete set null
                on update cascade
            )`,
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