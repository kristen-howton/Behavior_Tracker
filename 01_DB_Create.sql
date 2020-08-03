USE [master]

IF db_id('Behavior') IS NULL
  CREATE DATABASE [Behavior]
GO

USE [Behavior]
GO



DROP TABLE IF EXISTS [Report];
DROP TABLE IF EXISTS [Behavior];
DROP TABLE IF EXISTS [Learner];
DROP TABLE IF EXISTS [Consequence];
DROP TABLE IF EXISTS [PromptLevel];
DROP TABLE IF EXISTS [Activity];
DROP TABLE IF EXISTS [UserProfile];



CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirstName] varchar(50) NOT NULL,
  [LastName] varchar(50) NOT NULL,
  [Email] varchar(555) NOT NULL,
  [FirebaseUserId] varchar(28) NOT NULL,

CONSTRAINT UQ_firebaseUserId UNIQUE(FirebaseUserId)
)
GO


CREATE TABLE [Activity] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [ActivityName] varchar(50) NOT NULL,
  [ImageUrl] nvarchar(2000) NOT NULL,
  [Description] nvarchar(2000) NOT NULL,
  [IsDeleted] bit NOT NULL,

CONSTRAINT [FK_Activity_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

GO



CREATE TABLE [Consequence] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ConsequenceName] varchar(50) NOT NULL
)
GO

CREATE TABLE [PromptLevel] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Prompt] varchar(50) NOT NULL
)
GO

CREATE TABLE [Learner] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirstName] varchar(50) NOT NULL,
  [LastName] varchar(50) NOT NULL,
  [UserProfileId] integer NOT NULL,
CONSTRAINT [FK_Learner_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [Behavior] (
  [Id] integer PRIMARY KEY IDENTITY,
  [BehaviorName] varchar(50) NOT NULL,
  [LearnerId] integer NOT NULL,
  [IsDeleted] bit NOT NULL,

CONSTRAINT [FK_Behavior_Learner] FOREIGN KEY ([LearnerId]) REFERENCES [Learner] ([Id])
)

GO

CREATE TABLE [Report] (
  [Id] integer PRIMARY KEY IDENTITY,
  [BehaviorId] integer NOT NULL,
  [ConsequenceId] integer NOT NULL,
  [Date] datetime NOT NULL,
  [LearnerId] integer NOT NULL,
  [ActivityId] integer NOT NULL,
  [PromptLevelId] integer NOT NULL,
  [Note] varchar(500) NOT NULL,

CONSTRAINT [FK_Report_Behavior] FOREIGN KEY ([BehaviorId]) REFERENCES [Behavior] ([Id]),

CONSTRAINT [FK_Report_Consequence] FOREIGN KEY ([ConsequenceId])REFERENCES [Consequence] ([Id]),

CONSTRAINT [FK_Report_Learner] FOREIGN KEY ([LearnerId]) REFERENCES [Learner] ([Id]),

CONSTRAINT [FK_Report_Activity] FOREIGN KEY ([ActivityId]) REFERENCES [Activity] ([Id]),

CONSTRAINT [FK_Report_PromptLevel] FOREIGN KEY ([PromptLevelId]) REFERENCES [PromptLevel] ([Id])
)
GO
