CREATE TABLE [dbo].[List] (
    [ListNo]   INT           IDENTITY (1, 1) NOT NULL,
    [ListName] VARCHAR (100)  NOT NULL,
    [ListDesc] VARCHAR (256) NOT NULL,
    [ListDate] DATETIME      NOT NULL,
    [ListUser] VARCHAR (20)  NOT NULL,
    PRIMARY KEY CLUSTERED ([ListNo] ASC)
);

