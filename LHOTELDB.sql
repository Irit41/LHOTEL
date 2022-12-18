

----  יצירת משתמש
--CREATE USER MyLogin FOR LOGIN MyLogin
--ALTER ROLE db_owner ADD MEMBER MyLogin
--GO

SET DATEFORMAT dmy;  
GO



create table Employees_Types
(
	Worker_Code int NOT NULL,
	Description NVARCHAR(30)
	CONSTRAINT [PK_Worker_Code] PRIMARY KEY (Worker_Code)
)
go


create table Tasks_Types
(
	Task_Number int NOT NULL,
	Task_Name NVARCHAR(30) NOT NULL,
	CONSTRAINT [PK_Task_Number] PRIMARY KEY (Task_Number)
)
go


create table Customers_Types
(
	Customers_Type int NOT NULL,
	Description NVARCHAR(30),
	CONSTRAINT [PK_Customers_Type] PRIMARY KEY (Customers_Type)
)
go



create table Category
(
	Category_Number int not null,
	Description NVARCHAR(30)
	CONSTRAINT [PK_Category_Number] PRIMARY KEY (Category_Number)
)
go



create table Products
(
	Product_Code int identity(1,1),
	Category_Number int not null,
	Description NVARCHAR(30),
	Price_Per_Unit DECIMAL(10,2) NOT NULL,
	Discount_Percentage DECIMAL(10,2) NOT NULL,
	CONSTRAINT [PK_Product_Code] PRIMARY KEY (Product_Code),
	CONSTRAINT [Fk_Category_Number] FOREIGN KEY (Category_Number) REFERENCES Category (Category_Number)
)
go



create table Purchase_Of_Goods
(
	Product_Code int not null,
	Price_Per_Unit DECIMAL(10,2) NOT NULL,
	Amount int NOT NULL,
	Purchase_Date Date NOT NULL,
	Sum_Total DECIMAL(10,2) NOT NULL,
	CONSTRAINT [Fk_Purchase_Of_Goods] FOREIGN KEY (Product_Code) REFERENCES Products (Product_Code),
)
go



create table Employees
(
	Employee_ID int NOT NULL,
	Employee_Code int identity(1,1),
	Employee_Name nvarchar(30) NOT NULL,
	Phone_Number nvarchar(30) ,
    Birth_Date Date,
	Worker_Code int NOT NULL,
	Hourly_Wage int,
	Address nvarchar(30),
	CONSTRAINT [PK_Employee_ID] PRIMARY KEY (Employee_ID),
   CONSTRAINT [Fk_Worker_Code] FOREIGN KEY 
  (Worker_Code) REFERENCES Employees_Types (Worker_Code)
)
go



create table Customers
(
	Customer_ID int NOT NULL,
	Customer_Type int NOT NULL,
	First_Name nvarchar(30) NOT NULL,
	Last_Name nvarchar(30),
	Mail nvarchar(100) NOT NULL,
	Password nvarchar(30) NOT NULL,
	Phone_Number nvarchar(30) ,
	Card_Holder_Name nvarchar(30) ,
	Credit_Card_Date nvarchar(5) ,
	Three_Digit int ,
	Credit_Card_Number nvarchar(16),
	CONSTRAINT [PK_Customer_ID] PRIMARY KEY (Customer_ID),
	CONSTRAINT [Fk_Customer_Type] FOREIGN KEY 
    (Customer_Type) REFERENCES Customers_Types (Customers_Type)
)
go



create table Rooms
(
	Room_Number int identity(1,1),
	Room_Type NVARCHAR(30) NOT NULL,
	Price_Per_Night int NOT NULL,
	Details NVARCHAR(100) NOT NULL,
	CONSTRAINT [PK_Room_Number] PRIMARY KEY (Room_Number)
)
go



create table Bill
(
	Bill_Number int identity(1,1) NOT NULL,
	Customer_ID int NOT NULL,
	Bill_Date Date NOT NULL,
	Employee_ID int,
	Credit_Card_Number nvarchar(16),
	Bill_Status nvarchar(10) NOT NULL,
	CONSTRAINT [PK_Bill_Number1] PRIMARY KEY (Bill_Number,Customer_ID,Bill_Date),
	CONSTRAINT [Fk_Employee_ID2] FOREIGN KEY (Employee_ID) REFERENCES Employees (Employee_ID),
	CONSTRAINT [Fk_Customer_ID] FOREIGN KEY (Customer_ID) REFERENCES Customers (Customer_ID)
)
go


--select * from [dbo].[Employees]

--6	5	2	2021-01-13	21:00:00.0000000	Credit
--6	5	2	2021-01-13	21:00:00.0000000	Credit
--4	3	6	2021-03-12	16:00:00.0000000	Credit
--3	1	3	2021-12-12	21:00:00.0000000	Credit
--5	1	10	2021-12-12	21:00:00.0000000	Credit
--3	1	3	2021-12-12	21:00:00.0000000	Credit
--3	6	1	2021-12-12	21:00:00.0000000	Cash
--1	2	10	2021-12-12	13:00:00.0000000	Cash

--drop table Room_Reservations
--create table Room_Reservations
--(
--	Room_Number int not null,
--	Customer_ID int NOT NULL,
--	Room_Status nvarchar(30) NOT NULL,
--	CONSTRAINT [PK_Reservations_Room_Number] PRIMARY KEY (Room_Number),
--	CONSTRAINT [Fk_Reservation_Customer_ID] FOREIGN KEY (Customer_ID) REFERENCES Customers (Customer_ID),
--	CONSTRAINT [Fk_Reservation_Room_Number] FOREIGN KEY (Room_Number) REFERENCES Rooms (Room_Number),
--)
--go


create table Customers_Rooms
(
    Room_Number int NOT NULL,
	Bill_Number int ,
	Customer_ID int NOT NULL,
	Bill_Date Date NOT NULL,
	Entry_Date Date NOT NULL,
	Exit_Date Date NOT NULL,
	Amount_Of_People int NOT NULL,
	Breakfast BIT NOT NULL DEFAULT 0,
	Room_Status nvarchar(30) NOT NULL,
	CONSTRAINT [PK_Room_Number2] PRIMARY KEY (Room_Number),
	CONSTRAINT [Fk_Room_Number] FOREIGN KEY (Room_Number) REFERENCES Rooms (Room_Number),
	CONSTRAINT [Fk_Bill_Number3] FOREIGN KEY (Bill_Number,Customer_ID,Bill_Date) REFERENCES Bill (Bill_Number,Customer_ID,Bill_Date),
)
go



create table Bill_Details
(
	Bill_Number int NOT NULL,
	Customer_ID int NOT NULL,
	Bill_Date Date NOT NULL,
	Room_Number int NOT NULL,
	Purchase_Date Date NOT NULL,
	Product_Code int NOT NULL,
	Amount int NOT NULL,
	Purchase_Time date,
	Breakfast BIT NOT NULL DEFAULT 0,
	Payment_Method nvarchar(20) NOT NULL,
	CONSTRAINT [Fk_Product_Code] FOREIGN KEY (Product_Code) REFERENCES Products (Product_Code),
	CONSTRAINT Room_Number FOREIGN KEY (Room_Number) REFERENCES Customers_Rooms (Room_Number)
)
go




--2	2	222	2022-09-08	2022-09-14	2	Occupied
--20	NULL	888	2022-08-15	2022-08-17	10	Reserved
--3	3	333	2022-07-21	2022-07-25	2	Reserved
--8	4	444	2022-07-14	2022-07-20	8	Occupied
--9	5	555	2021-07-05	2021-07-08	2	Reserved
--7	6	666	2021-06-06	2021-06-12	4	Occupied


create table Shifts
(
	Employee_ID int NOT NULL,
	Employee_Code int NOT NULL,
	Worker_Code int NOT NULL,
	Date date not null,
	Entrance_Time time NOT NULL,
	Leaving_Time time ,
	CONSTRAINT [PK_Shifts_Employee_Entrance_Time] PRIMARY KEY (Employee_ID,Date),
	CONSTRAINT [Fk_Shifts_Employee_ID] FOREIGN KEY (Employee_ID) REFERENCES Employees (Employee_ID)
)
go


select * from Employees_Tasks

create table Employees_Tasks
(
	Task_Code int identity(1,1) NOT NULL,
	Employee_ID int,
	Employee_Name nvarchar(30),
	Task_Number int,
	Room_Number int,
	Start_Date Date  NOT NULL,
    Start_Time Time  NOT NULL,
	End_Time Time ,
	Task_Status nvarchar(30),
	Description NVARCHAR(100),
	CONSTRAINT [PK_Employee_ID2] PRIMARY KEY (Task_Code),
	CONSTRAINT [Fk_Employee_ID] FOREIGN KEY (Employee_ID,Start_Date) REFERENCES Shifts (Employee_ID,Date),
	CONSTRAINT [Fk_Task_Number] FOREIGN KEY (Task_Number) REFERENCES Tasks_Types (Task_Number),
	CONSTRAINT [Fk_Employees_Tasks_Room_Number] FOREIGN KEY (Room_Number)
	REFERENCES Rooms ([Room_Number])
)
go

--57	NULL	4	2	2022-10-14	19:00:00.0000000	16:10:00.0000000	Close	NULL
--59	222	1	2	2022-10-14	13:00:00.0000000	NULL	Close	NULL
--60	NULL	3	7	2022-10-14	21:28:00.0000000	16:10:00.0000000	Close	Gigujchchv
--69	NULL	1	2	2022-01-10	13:00:00.0000000	NULL	Close	NULL
--73	NULL	1	25	2022-10-01	20:10:00.0000000	12:10:00.0000000	Close	Dhdhdhd
--76	NULL	1	25	2022-10-15	20:10:00.0000000	11:10:00.0000000	Close	Dhdhdhd
--77	333	1	25	2022-10-15	20:10:00.0000000	11:10:00.0000000	Close	Dhdhdhd
--78	333	4	18	2022-10-19	10:42:00.0000000	13:10:00.0000000	Close	NULL
--79	111	3	12	2022-10-16	10:00:00.0000000	11:10:00.0000000	Close	Only 1 towel please
--82	NULL	2	5	2022-10-17	14:10:00.0000000	NULL	Open	NULL
--83	NULL	1	8	2022-10-06	09:43:00.0000000	11:10:00.0000000	Close	The balcony is dusty 
--85	111	4	10	2022-10-19	11:10:00.0000000	13:10:00.0000000	Close	Jvjvjvjv 
--91	NULL	2	13	2022-10-19	12:10:00.0000000	13:10:00.0000000	Close	NULL
--92	NULL	2	13	2022-10-19	12:10:00.0000000	13:10:00.0000000	Close	NULL
--93	NULL	2	21	2022-10-27	22:00:00.0000000	NULL	Open	Bivjvjvjvjvu Jvj   
--94	333	1	11	2022-10-19	13:10:00.0000000	13:10:00.0000000	Close	NULL

insert [dbo].[Employees_Tasks] values (NULL,NULL,1,2,'2022-10-14',
		'19:00:00.0000000','19:19:00.0000000','Close',NULL)


insert [dbo].[Employees_Tasks] values (NULL,NULL,2,11,'2022-10-17',
		'12:10:00.0000000','13:10:00.0000000','Close',NULL)


























--NULL	4	2	2022-10-14	19:00:00.0000000	16:10:00.0000000	Close	NULL
--222	1	2	2022-10-14	13:00:00.0000000	NULL	Close	NULL
--NULL	3	7	2022-10-14	21:28:00.0000000	16:10:00.0000000	Close	Gigujchchv
--NULL	1	2	2022-01-10	13:00:00.0000000	NULL	Close	NULL
--NULL	1	25	2022-10-01	20:10:00.0000000	12:10:00.0000000	Close	Dhdhdhd
--NULL	1	25	2022-10-15	20:10:00.0000000	11:10:00.0000000	Close	Dhdhdhd
--333	1	25	2022-10-15	20:10:00.0000000	11:10:00.0000000	Close	Dhdhdhd
--333	4	18	2022-10-19	10:42:00.0000000	13:10:00.0000000	Close	NULL
--111	3	12	2022-10-16	10:00:00.0000000	11:10:00.0000000	Close	Only 1 towel please
--NULL	2	5	2022-10-17	14:10:00.0000000	NULL	Open	NULL
--NULL	1	8	2022-10-06	09:43:00.0000000	11:10:00.0000000	Close	The balcony is dusty 
--111	4	10	2022-10-19	11:10:00.0000000	13:10:00.0000000	Close	Jvjvjvjv 
--NULL	2	13	2022-10-19	12:10:00.0000000	13:10:00.0000000	Close	NULL
--NULL	2	13	2022-10-19	12:10:00.0000000	13:10:00.0000000	Close	NULL
--NULL	2	21	2022-10-27	22:00:00.0000000	NULL	Open	Bivjvjvjvjvu Jvj   
--333	1	11	2022-10-19	13:10:00.0000000	13:10:00.0000000	Close	NULL













--drop table Purchases_Documentation
create table Purchases_Documentation
(
	Bill_Number int,
	Customer_ID int,
	Bill_Date date,
	Room_Number int,
	Room_Type nvarchar(30),
	Price_Per_Night int,
	Amount_Of_People int,
	Breakfast BIT NOT NULL DEFAULT 0,
	Entry_Date Date NOT NULL,
	Exit_Date Date NOT NULL,
	Number_Of_Nights int,
	Payment_Method nvarchar(30),
	Product_Code int
)
go
--exec Room_Resit 206055899

--Task_Code int identity(1,1) NOT NULL,
--	Employee_ID int,
--	Task_Number int,
--	Room_Number int,
--	Start_Date Date  NOT NULL,
--    Start_Time Time  NOT NULL,
--	End_Time Time ,
--	Task_Status nvarchar(30),
--	Description NVARCHAR(100),
--	CONSTRAINT [PK_Employee_ID2] PRIMARY KEY (Employee_ID,Task_Number,Start_Date,Start_Time),
--	CONSTRAINT [Fk_Employee_ID] FOREIGN KEY (Employee_ID,Start_Date) REFERENCES Shifts (Employee_ID,Date),
--	CONSTRAINT [Fk_Task_Number] FOREIGN KEY (Task_Number) REFERENCES Tasks_Types (Task_Number),
--	CONSTRAINT [Fk_Employees_Tasks_Room_Number] FOREIGN KEY (Room_Number)
--	REFERENCES Rooms ([Room_Number])
--222	7	2022-02-02	13:12:00.0000000	2022-02-03	Open	Clean the counter is filthy
--222	7	2022-08-17	13:00:00.0000000	2022-03-02	Open	Clean the counter is filthy
--333	1	2022-02-02	13:10:00.0000000	2022-02-03	Close	Room cleaning 21
--444	2	2022-02-02	13:05:00.0000000	2022-02-03	Open	Schnitzel, chips and coke for 
--555	4	2022-02-02	13:07:00.0000000	2022-02-03	Close	Mini bar filling for room 10
--777	3	2022-02-02	13:08:00.0000000	2022-02-03	Open	Room 15 request dry towels
--888	6	2022-02-02	13:12:00.0000000	2022-02-03	Close	A customer requests to check o


--sp_rename 'table_name.old_column_name', 'new_column_name', 'COLUMN';

--insert [dbo].[Employees_Types] values(1,'Manager')
--insert [dbo].[Employees_Types] values(2,'Receptionist')
--insert [dbo].[Employees_Types] values(3,'Room service')
--select * from [Employees_Types]

--select * from [dbo].[Customers_Types]
--insert [dbo].[Customers_Types] values(1,'occasional')
--insert [dbo].[Customers_Types] values(2,'Regular')
--insert [dbo].[Customers_Types] values(3,'VIP')

--select * from [dbo].[Category]
--insert [dbo].[Category] values(1,'Alcohol')
--insert [dbo].[Category] values(2,'Snack')
--insert [dbo].[Category] values(3,'Sweet Drink')
--insert [dbo].[Category] values(5,'Breakfast')

--select * from [dbo].[Tasks_Types]
--insert [dbo].[Tasks_Types] values(1,'Room Cleaning')
--insert [dbo].[Tasks_Types] values(2,'Room Service')
--insert [dbo].[Tasks_Types] values(3,'Change towels')
--insert [dbo].[Tasks_Types] values(4,'Refill mini bar')




--=================================================================================================================================================
                                                --פרוצדורות
--=================================================================================================================================================

-- פרוצדורות עובדים

-------------------------------------------
create proc GetAllEmployees
as
	begin tran
		SELECT dbo.Employees.Employee_ID, dbo.Employees_Types.Description, dbo.Employees.Employee_Name,
		dbo.Employees.Phone_Number, dbo.Employees.Birth_Date, dbo.Employees.Hourly_Wage, 
		dbo.Employees.Address, dbo.Employees.Employee_Code
		FROM dbo.Employees INNER JOIN dbo.Employees_Types 
		ON dbo.Employees.Worker_Code = dbo.Employees_Types.Worker_Code
		GROUP BY dbo.Employees.Employee_ID, dbo.Employees_Types.Description,
		dbo.Employees.Employee_Name, dbo.Employees.Phone_Number, dbo.Employees.Birth_Date, 
		dbo.Employees.Hourly_Wage, dbo.Employees.Address, dbo.Employees.Employee_Code
	if (@@error !=0)
		begin
			rollback tran
			print 'error'
			return
		end
	commit tran
go
--exec GetAllEmployees



create proc GetEmployeeById
@id int
as
begin tran

SELECT dbo.Employees.Employee_ID, dbo.Employees.Employee_Code, dbo.Employees_Types.Description,
dbo.Employees.Employee_Name, 
dbo.Employees.Phone_Number, dbo.Employees.Birth_Date, dbo.Employees.Worker_Code, 
dbo.Employees_Types.Description as Role, dbo.Employees.Hourly_Wage, dbo.Employees.Address
FROM     dbo.Employees INNER JOIN
                  dbo.Employees_Types ON dbo.Employees.Worker_Code = dbo.Employees_Types.Worker_Code
				  where dbo.Employees.Employee_ID = @id 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetEmployeeById 222
--select * from Employees




create proc GetEmployeeByIdAndPassword
@id int,
@password int
as
begin tran

SELECT dbo.Employees.Employee_ID, dbo.Employees_Types.Description,
dbo.Employees.Employee_Name, 
dbo.Employees.Phone_Number, dbo.Employees.Birth_Date,
dbo.Employees_Types.Description as Role, dbo.Employees.Hourly_Wage, dbo.Employees.Address,
dbo.Employees.[Employee_Code]
FROM     dbo.Employees INNER JOIN
                  dbo.Employees_Types ON dbo.Employees.Worker_Code = dbo.Employees_Types.Worker_Code
				  where dbo.Employees.Employee_ID = @id and Employee_Code = @password
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec GetEmployeeByIdAndPassword 111,21
--select * from Employees


create proc InsertEmployee 
@id int, 
@name nvarchar(30),
@phoneNumber nvarchar(30),
@birthDate Date, 
@role nvarchar(30), 
@hourly_Wage int, 
@address nvarchar(30)
as
begin tran
	declare @dateResult as date  = convert(date, @birthDate, 103) 
	declare @worker_Code as int = (select [Worker_Code] from [dbo].[Employees_Types]
	where [Description] = @role)
	insert  [dbo].[Employees] values (@id,@name,@phoneNumber,@dateResult,@worker_Code,@hourly_Wage,@address)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec InsertEmployee 111,'aaa','0526211881','2022-08-15','Manager',40,'aaa'
--exec InsertEmployee -1,'','','','General',-1,''
--111	Manager	aaa	0526211881	2022-08-15	40	aaa	1
--222	Receptionist	bbb	0526211881	2022-08-15	40	bbb	2
--333	Room service	ccc	0542611881	2022-08-15	40	ccc	3
--444	Room service	ddd	0548937881	2022-08-15	41	ddd	4
--555	Room service	eee	0528057777	2022-08-15	41	eee	5
--666	Manager	fff	0502359678	2022-08-15	41	fff	6
--777	Room service	ggg	0502233344	2022-08-15	41	ggg	7
--888	Receptionist	hhh	0523491528	2022-08-15	41	hhh	8
--999	Manager	cccc	05266666666	2022-08-15	40	hbhjbkjbjk	18
--exec GetAllEmployees


-----------------------------------------------------


create proc AlterEmployee
@id int, 
@name nvarchar(30),
@phoneNumber nvarchar(30),
@birthDate date, 
@role nvarchar(30), 
@hourly_Wage int, 
@address nvarchar(30)
as
begin tran

	declare @worker_Code as int = (select [Worker_Code] from [dbo].[Employees_Types]
	where [Description] = @role)
	UPDATE [dbo].[Employees]
	SET [Employee_Name] = @name ,[Phone_Number]= @phoneNumber,[Birth_Date]=@birthDate
	,[Worker_Code]=@worker_Code,[Hourly_Wage]=@hourly_Wage,[Address]=@address
	WHERE [Employee_ID] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec AlterEmployee 999,'ccc','0563211948','2022 - 08 - 15','Manager',40,'dgdbbd'
--select * from [dbo].[Employees]


---------------------------------------------------------
---  יהיה צורך למחוק אות מהטבלה "משמרות ו"משימות" ף
alter proc DeleteEmployeeById
@id int
as
begin tran

	delete from [dbo].[Employees_Tasks] where [Employee_ID] = @id
	delete from [dbo].[Shifts] where [Employee_ID] = @id
	update [dbo].[Bill]
	set [Employee_ID] = -1
	where [Employee_ID] = @id
	delete FROM [Employees] WHERE [Employee_ID] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec DeleteEmployeeById 111



-- פרוצדורות לקוחות
----------------------------------------------
create proc GetAllCustomers
as
begin tran
select * from [dbo].[Customers]	
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec GetAllCustomers
-- exec DeleteCustomerById 206055899 


-------------------------------------------
create proc GetCustomerById 
@id int
as
begin tran
	select * from [dbo].[Customers] where [Customer_ID] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetCustomerById 10


create proc GetDBCustomerById 
@id int
as
begin tran
	select Customer_ID,Customer_Type,First_Name,Last_Name,Mail,Phone_Number from [dbo].[Customers] where [Customer_ID] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
 --exec GetDBCustomerById 7878



create proc GetCustomerByMail
@Mail nvarchar(100)
as
begin tran
		select * from [dbo].[Customers] 
		where Mail = @Mail 
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec GetCustomerByMail 'John@gmail.com'


create proc GetCustomerByIDAndMail
@id int,
@Mail nvarchar(100)
as
begin tran
	select * from [dbo].[Customers] 
	where Mail = @Mail and Customer_ID = @id
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetCustomerByIDAndMail 315201913 , 'firstName'



create proc AddNewCustomer
@id int,
@Customer_Type int,
@First_Name nvarchar(30),
@Last_Name nvarchar(30),
@Mail nvarchar(100),
@Password nvarchar(30),
@Phone_Number nvarchar(30) ,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(16)
as
begin tran
	insert [dbo].[Customers] values (@id ,@Customer_Type,@First_Name,@Last_Name,@Mail,@Password,@Phone_Number
	,@Card_Holder_Name,@Credit_Card_Date,@Three_Digit,@Credit_Card_Number)
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--select * from Customers
--exec AddNewCustomer 111,1,'aaa','aaa','aaa@gmail.com','aaa','0524987762','aaa','02/28',569,'4580111122223333'
--exec AddNewCustomer 222,2,'bbb','bbb','bbb@gmail.com','bbb','0501264859','bbb','02/28',781,'4580211122223333'
--exec AddNewCustomer 333,3,'ccc','ccc','ccc@gmail.com','ccc','0541528971','ccc','02/28',569,'4580311122223333'
--exec AddNewCustomer 999,1,'mmm','mmm','mmm@gmail.com','mmm','0526159848','','',-1,''
--{
--    "CustomerID":"91598872",
--    "FirstName":"Yafit",
--    "LastName":"Yona",
--    "Mail":"Yafit@gmail.com",
--    "password":"123456789",
--    "PhoneNumber":"05449856363"
--}



create proc AlterCustomerById
@id int,
@Customer_Type int,
@First_Name nvarchar(30),
@Last_Name nvarchar(30),
@Mail nvarchar(100),
@Password nvarchar(30),
@Phone_Number nvarchar(30) ,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(16)
as
begin tran
	UPDATE [dbo].[Customers]
	SET  [Customer_Type] = @Customer_Type, 
	[First_Name]=@First_Name,
	[Last_Name]=@Last_Name,
	[Mail] = @Mail,
	[Phone_Number] =@Phone_Number, 
	[Card_Holder_Name] =@Card_Holder_Name, 
	[Credit_Card_Date]=@Credit_Card_Date,
	[Three_Digit]=@Three_Digit,
	[Credit_Card_Number] = @Credit_Card_Number,
	[Password] = @Password 
	WHERE [Customer_ID] = @id
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec AlterCustomerById 111,1,'aaa','aaa','aaa@gmail.com','aaa','0524987762','aaa','02/28',569



create proc UpdateCustomerCredit
@id int,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(16)
as
begin tran
	UPDATE [dbo].[Customers]
	SET 	
	[Card_Holder_Name] =@Card_Holder_Name, 
	[Credit_Card_Date]=@Credit_Card_Date,
	[Three_Digit]=@Three_Digit,
	[Credit_Card_Number] = @Credit_Card_Number
	WHERE [Customer_ID] = @id
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec UpdateCustomerCredit 999,'mmm','02/28',123,'21312'


create proc DeleteCustomerById
@id int
as
	DELETE FROM [dbo].[Customers] WHERE [Customer_ID] = @id
go
--exec DeleteCustomerById 91598872 



-- פרוצדורות קטגוריה
create proc GetCategory
as
begin tran
		select * from [dbo].[Category]
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetCategory

---------------------------------------------
create proc AddNewCategory
@Category_Number int,
@Description nvarchar(30)
as
begin tran
	insert [dbo].[Category] values(@Category_Number,@Description)
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec AddNewCategory 1,'sweet drink'
--exec AddNewCategory 2,'Alcohol'
--exec AddNewCategory 3,'Snacks'


-----------------------------------------------
create proc AlterCategory
@Category_Number int,
@Description nvarchar(30)
as
begin tran
update [dbo].[Category]
	set Description = @Description
	where Category_Number = @Category_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec AlterCategory 1,'Sweet Drink'



-- פרוצדורות מוצרים
create proc GetAllProducts
as
begin tran
	select * from [dbo].[Products]
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllProducts


create proc GetProductById
@id int
as
	begin tran
	select * from dbo.Products where Products.Product_Code = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetProductById 7


create proc AddNewProduct
@Category_Number int,
@Description nvarchar(30) ,
@Price_Per_Unit int ,
@Discount_Percentage int
as
begin tran
	Insert [dbo].[Products] Values (@Category_Number,@Description,@Price_Per_Unit,@Discount_Percentage)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--1	1	Coca cola	15.00	0.00
--2	2	Vodka	35.00	0.00
--3	3	Bamba	20.00	0.00
--4	3	Doritos	20.00	50.00
--5	1	Sprite	15.00	15.00
--6	2	Whiskey	45.00	0.00
--7	3	Chips	20.00	0.00
--8	4	Room	0.00	0.00
--9	5	Breakfast	70.00	0.00


----------------------------------------------
create proc AlterProductById
@id int,
@Description nvarchar(30) ,
@Price_Per_Unit int ,
@Discount_Percentage int
as
begin tran
	UPDATE [dbo].[Products]
	SET [Description] = @Description,
	[Price_Per_Unit]=@Price_Per_Unit,
	[Discount_Percentage] = @Discount_Percentage
	WHERE [Product_Code] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec AlterProductById 1,'Coca cola',15,50


-----------------------------------------------------
create proc DeleteProductById
@id int
as
begin tran
		DELETE FROM [dbo].[Products] WHERE [Product_Code] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec DeleteProductById 2



---  פרוצדורות רכישות הספקה
create proc GetAllPurchase_Of_Goods
as
begin tran
select * from [dbo].[Purchase_Of_Goods]
	order by [Purchase_Date] desc
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetAllPurchase_Of_Goods


create proc GetPurchase_Of_Goods_ByCode
@Code int
as
	begin tran
	select * from [dbo].[Purchase_Of_Goods]
	where [Product_Code] = @Code
	order by [Purchase_Date] desc
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec GetPurchase_Of_Goods_ByCode 1 


create proc AddNewPurchase_Of_Goods
@Product_Code int,
@Price_Per_Unit decimal(10,2),
@Amount int,
@Purchase_Date date
as
begin tran
declare @Sum_Total as decimal(10,2) = @Price_Per_Unit * @Amount
	insert [dbo].[Purchase_Of_Goods] 
	values(@Product_Code , @Price_Per_Unit , @Amount, @Purchase_Date , @Sum_Total)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec AddNewPurchase_Of_Goods 1,7.5,100,'07/07/2022'
--exec AddNewPurchase_Of_Goods 2,25,230,'07/07/2022'
--exec AddNewPurchase_Of_Goods 3,10,300,'07/07/2022'
--exec AddNewPurchase_Of_Goods 4,15,50,'07/07/2022'
--exec AddNewPurchase_Of_Goods 5,9,76,'07/07/2022'
--exec AddNewPurchase_Of_Goods 6,30,89,'07/07/2022'
--exec AddNewPurchase_Of_Goods 7,10,191,'07/07/2022'



create proc AlterPurchase_Of_Goods
@Product_Code int,
@Price_Per_Unit decimal(10,2),
@Amount int,
@Purchase_Date date
as
begin tran
	declare @Sum_Total as decimal(10,2) = @Price_Per_Unit * @Amount
	update [dbo].[Purchase_Of_Goods]
	set [Product_Code] = @Product_Code ,  [Price_Per_Unit] = @Price_Per_Unit,
	[Amount] = @Amount , [Purchase_Date] = @Purchase_Date, [Sum_Total] = @Sum_Total
	where [Product_Code] = @Product_Code
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec AlterPurchase_Of_Goods 1,1,8,200,'07/07/2022'


create proc DeletePurchase_Of_Goods
@Product_Code int,
@Purchase_Date date
as
begin tran
	delete from [dbo].[Purchase_Of_Goods] 
	where [Product_Code] = @Product_Code and [Purchase_Date] = @Purchase_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec DeletePurchase_Of_Goods 1 ,'07/07/2022'



--  פרוצדורות חדרים 
----------------------------------------
create proc GetAllRooms
as
begin tran
	select * from [dbo].[Rooms]
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go 
-- exec GetAllRooms


------------------------------------
create proc GetRoomById
@id int
as
begin tran
	select * from [dbo].[Rooms] where [Room_Number] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetRoomById 1


create proc AddNewRoom
@Room_Type nvarchar(30),
@Price_Per_Night int,
@Details NVARCHAR(100)
as
	begin tran
	Insert [dbo].[Rooms] Values (@Room_Type,@Price_Per_Night,@Details)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'

--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'

--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'


--drop proc AlterRoomById
--alter proc AlterRoomById
--@Room_Number int,
--@Customer_ID int,
--@Status NVARCHAR(30)
--as
--	begin tran
--	UPDATE [dbo].[Rooms]
--	SET  [Customer_ID] = @Customer_ID , [Status] = @Status
--	WHERE [Room_Number] = @Room_Number
--	if (@@error !=0)
--	begin
--		rollback tran
--		print 'error'
--		return
--	end
--commit tran
--go
--exec AlterRoomById 5,null,'Available'


--drop proc DeleteRoomById
--create proc DeleteRoomById
--@Room_Number int
--as
--	DELETE FROM [dbo].[Rooms] WHERE [Room_Number] = @Room_Number
--go
-- exec DeleteRoomById 1


---  פרוצדורות טבלת משמרות
create proc GetAllShifts
as
begin tran
	SELECT dbo.Shifts.Employee_ID, dbo.Employees.Employee_Code, dbo.Employees.Employee_Name,
	dbo.Employees_Types.Description, dbo.Shifts.Date,
	CONVERT(VARCHAR(5), dbo.Shifts.Entrance_Time, 108) AS Entrance_Time, 
	CONVERT(VARCHAR(5), dbo.Shifts.Leaving_Time, 108) AS Leaving_Time
	FROM dbo.Shifts INNER JOIN dbo.Employees 
	ON dbo.Shifts.Employee_ID = dbo.Employees.Employee_ID INNER JOIN
    dbo.Employees_Types ON dbo.Employees.Worker_Code = dbo.Employees_Types.Worker_Code
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllShifts

 --CONVERT(VARCHAR(5), dbo.Shifts.Entrance_Time, 108) AS Entrance_Time 



create proc GetWorkersOnShift
as
begin tran
	SELECT dbo.Shifts.Employee_ID, dbo.Employees.Employee_Code, dbo.Employees.Employee_Name,
	dbo.Employees_Types.Description, dbo.Shifts.Date,
	CONVERT(VARCHAR(5), dbo.Shifts.Entrance_Time, 108) AS Entrance_Time, 
	CONVERT(VARCHAR(5), dbo.Shifts.Leaving_Time, 108) AS Leaving_Time
	FROM dbo.Shifts INNER JOIN dbo.Employees 
	ON dbo.Shifts.Employee_ID = dbo.Employees.Employee_ID INNER JOIN
    dbo.Employees_Types ON dbo.Employees.Worker_Code = dbo.Employees_Types.Worker_Code
	where dbo.Shifts.Date =	 FORMAT(getdate(), 'yyyy-MM-dd') 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetWorkersOnShift


 
create proc ClockIn
@Employee_ID int,
@Entry_Time nvarchar(5)
as
begin tran
	DECLARE @Employee_Code int=(select Employee_Code  from Employees 
	where Employee_ID = @Employee_ID)
	DECLARE @Worker_Code int =(select Worker_Code from Employees 
	where Employee_ID = @Employee_ID)
	insert [dbo].[Shifts] values (@Employee_ID,@Employee_Code,@Worker_Code,getdate(),@Entry_Time,null)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllShifts
--exec ClockIn 111, '15:33'
--exec ClockIn 222, '12:00'
--exec ClockIn 333, '08:56'



create proc DeleteShift
@Employee_ID int,
@Entrance_Time datetime
as
begin tran
	delete from [dbo].[Shifts]
	where Employee_ID = @Employee_ID and Entrance_Time = @Entrance_Time
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec DeleteShift 111,'2022-08-23 02:16:12.000'
--create proc ClockOutAuto
--@Employee_ID int,
--@Leaving_Time nvarchar(5)
--as
--begin tran
--	update [dbo].[Shifts]
--	set [Leaving_Time] = @Leaving_Time
--	where Employee_ID = @Employee_ID and [Leaving_Time] IS NULL
--	if (@@error !=0)
--	begin
--		rollback tran
--		print 'error'
--		return
--	end
--commit tran
--go






create proc ClockOut
@Employee_ID int,
@Leaving_Time nvarchar(5)
as
begin tran
	update [dbo].[Shifts]
	set [Leaving_Time] = @Leaving_Time
	where Employee_ID = @Employee_ID and [Leaving_Time] IS NULL
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec ClockOut 123456789 ,'17:00'
-- select * from [dbo].[Shifts]


select * from Employees_Tasks
--  פרוצדורות משימות
create proc GetAllTasks
as
begin tran
SELECT dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Employees_Tasks.Employee_Name, dbo.Tasks_Types.Task_Name, 
dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, 
CONVERT(VARCHAR(5), dbo.Employees_Tasks.Start_Time, 108) AS Start_Time,
CONVERT(VARCHAR(5), dbo.Employees_Tasks.End_Time, 108) AS End_Time,
 dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
FROM dbo.Tasks_Types INNER JOIN dbo.Employees_Tasks 
ON dbo.Tasks_Types.Task_Number = dbo.Employees_Tasks.Task_Number
GROUP BY dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID,dbo.Employees_Tasks.Employee_Name, dbo.Tasks_Types.Task_Name,
dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
	order by dbo.Employees_Tasks.Task_Status desc
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--select * from [dbo].[Employees_Tasks]
--select * from [dbo].[Employees_Types]
-- exec GetAllTasks
    -- "Task_Code":5,
    --"Employee_ID":222,
    -- "Task_Name":"Check-in Customer",
    -- "Room_Number":null,
    -- "Start_Date":"2022-09-06",
    -- "Start_Time":"13:00",
    --"End_Time":"14:00",
    -- "Task_Status":"Open",
    -- "Description":"hhhh"


create proc GetTask_ByCode
@code int
as
begin tran
	SELECT dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name,
	dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date,
		CONVERT(VARCHAR(5), dbo.Employees_Tasks.Start_Time, 108) AS Start_Time,
	CONVERT(VARCHAR(5), dbo.Employees_Tasks.End_Time, 108) AS End_Time,
   
   dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
FROM     dbo.Tasks_Types INNER JOIN
                  dbo.Employees_Tasks ON dbo.Tasks_Types.Task_Number = dbo.Employees_Tasks.Task_Number

where dbo.Employees_Tasks.Task_Code = @code

GROUP BY dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
                  dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllTasks
-- exec GetTask_ByCode 48



alter proc GetTask_ById
@id int
as
begin tran
	SELECT dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID,dbo.Employees_Tasks.Employee_Name, dbo.Tasks_Types.Task_Name,
	dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date,
	CONVERT(VARCHAR(5), dbo.Employees_Tasks.Start_Time, 108) AS Start_Time,
	CONVERT(VARCHAR(5), dbo.Employees_Tasks.End_Time, 108) AS End_Time,
	dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
FROM     dbo.Tasks_Types INNER JOIN
                  dbo.Employees_Tasks ON dbo.Tasks_Types.Task_Number = dbo.Employees_Tasks.Task_Number

where  dbo.Employees_Tasks.Employee_ID = @id

GROUP BY dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID,dbo.Employees_Tasks.Employee_Name,  dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
                  dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllTasks
-- exec GetTask_ById 444




alter proc AddNewTask
@Employee_ID int, 
@Employee_Name nvarchar(30), 
@Room_Number int,
@Task_Name nvarchar(30),
@Date  date,
@start_Time nvarchar(5),
@end_Time nvarchar(5),
@status nvarchar(10),
@Description nvarchar(30)
as
begin tran

	--declare @Date as date = (SELECT FORMAT (getdate(), 'yyyy-MM-dd'))
	
	if(@end_Time = '')
	begin
		Set @end_Time = null
	end 
	if(@Description = '')
	begin
		Set @Description = null
	end 

	declare @number int = (select [Task_Number] from [dbo].[Tasks_Types]where [Task_Name] = @Task_Name)
	--if EXISTS (SELECT Room_Number FROM Customers_Rooms WHERE Customers_Rooms.Room_Number = @Room_Number)
	--set @Employee_ID = null
		insert [dbo].[Employees_Tasks] values (@Employee_ID,@Employee_Name,@number,@Room_Number ,@Date,
		@start_Time,@end_Time,@status, @Description)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go



exec AddNewTask 333,'ccc',6,'Room Service','2022-11-21','09:51','','Open','Pizza'


--exec AddNewTask null,2,'Refill mini bar','19:00',null,'Open',''	
--select * from [dbo].[Employees]_Tasks]
--select * from Shifts
--exec ClockIn 333,'11:00' 
--exec GetAllShifts
--select * from Tasks_Types
--exec GetAllTasks
--exec AddNewTask null,15,'Room Cleaning','21:28',null,'Open','yyyyy'	
--  "EmployeeID": -1,
--  "EndTime": null,
--  "RoomNumber": "7",
--  "StartTime": "21:28",
--  "TaskName": "Change of towels",
--  "TaskStatus": "Open",
--   "Description": "Gigujchchv"



alter proc AlterTask
@Tasks_Code int,
@Employee_ID int, 
@Employee_Name nvarchar(30),
@Room_Number int,
@Task_Name nvarchar(30),
@Start_Time time(7) ,
@End_Time time(7),
@Task_Status nvarchar(30),
@Description nvarchar(30)
as
begin tran

	declare @number int = (select [Task_Number] from [dbo].[Tasks_Types]where [Task_Name] = @Task_Name)

	if(@End_Time = '')
	begin
		Set @End_Time = null
	end
	if(@Description = '')
	begin
		Set @Description = null
	end 

	if(@Employee_ID = -1)
	begin
		set @Employee_ID = null
		end
		if(@Employee_Name = '')
	begin
		set @Employee_Name = null

	end

	UPDATE [dbo].[Employees_Tasks]
	SET 
	[Employee_ID] = @Employee_ID ,
	[Employee_Name] = @Employee_Name ,
	[Task_Number] = @number ,
	[Room_Number] = @Room_Number,
	[Start_Date] = (SELECT FORMAT (getdate(), 'yyyy-MM-dd')),
	[Start_Time] = @Start_Time,
	[End_Time]= @End_Time,
	[Task_Status]=@Task_Status,
	[Description]=@Description
	WHERE [Task_Code] = @Tasks_Code
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllTasks
--exec GetAllShifts
--select * from Shifts
--exec AlterTask 92,-1,13,'Room Service','12:10','12:10','Open',''
--select * from [dbo].[Employees_Tasks]
	delete from Shifts where Employee_ID =333
	exec AlterTask 44,333,'ccc',6,'Room Service','09:51','10:54','Completed','Pizza'
	@Tasks_Code int,
@Employee_ID int, 
@Employee_Name nvarchar(30),
@Room_Number int,
@Task_Name nvarchar(30),
@Start_Time time(7) ,
@End_Time time(7),
@Task_Status nvarchar(30),
@Description nvarchar(30)
create proc DeleteTask
@Tasks_Code int
as
begin tran
	delete from [dbo].[Employees_Tasks]
	where [Task_Code] = @Tasks_Code
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--select * from [Employees_Tasks]
--exec DeleteTask 23
--exec DeleteTask {code}



alter proc CloseTask
@Task_Status nvarchar(150),
@Task_Code int,
@time nvarchar(5)
as
begin tran
	UPDATE [dbo].[Employees_Tasks]
	SET 
	[Task_Status]=@Task_Status,
	[End_Time] = @time
	WHERE [Task_Code] = @Task_Code
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec CloseTask 25, '14:00'
--select * from [dbo].[Employees_Tasks]

exec AddNewTask 333,'ccc',6,'Room Service','2022-11-21','09:51','','Open','Pizza'

-- פרוצדורות חשבון ללקוח
---------------------------------------------------
create proc GetAllBills
as
begin tran	
	select * from [dbo].[Bill]
	order by [Bill_Status] desc
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllBills
--exec GetAllEmployees


--------------------------------------------------
create proc  GetBillByNumber
@Bill_Number int
as
begin tran	
	select * from [dbo].[Bill]
	where Bill_Number = @Bill_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetBillByNumber 1 


create proc AddNewBill 
@Employee_ID int,
@Customer_ID int,
@Credit_Card_Number nvarchar(16),
@Bill_Date date,
@Bill_Status nvarchar(10)
as
begin tran	
	insert [dbo].[Bill] 
	values( @Customer_ID,@Bill_Date,@Employee_ID,@Credit_Card_Number,@Bill_Status)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec AddNewBill 111,'2022-08-22',111,'4580266514789456','Open'



create proc AlterBill
@Customer_ID int,
@Bill_Date date,
@Employee_ID int,
@Credit_Card_Number nvarchar(16),
@Bill_Status nvarchar(10)
as
begin tran	
	UPDATE [dbo].[Bill]
	SET Employee_ID = @Employee_ID,
	Credit_Card_Number = @Credit_Card_Number,
	Bill_Status = @Bill_Status
	where Customer_ID=@Customer_ID and Bill_Date = @Bill_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllBills
-- exec AlterBill 444,'2021-01-01',444,'4580266514789456','Open'



-----------------------------------------------
create proc DeleteBill
@Bill_Number int,
@Customer_ID int,
@Bill_Date date,
@Credit_Card_Number nvarchar(16)
as
begin tran	
		DELETE FROM [dbo].[Bill] 
	WHERE Bill_Number = @Bill_Number and Customer_ID = @Customer_ID 
	and Credit_Card_Number = @Credit_Card_Number and Bill_Date = @Bill_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec DeleteBill 14,111,'01/01/2021','4580266514789456'
--exec DeleteBill 15,222,'01/01/2021','4580266514789456'
--exec DeleteBill 16,333,'01/01/2021','4580266514789456'
--exec DeleteBill 17,444,'01/01/2021','4580266514789456'
--exec DeleteBill 18,555,'12/09/2020','4580266514789456'
--exec DeleteBill 19,444,'23/09/2020','458026651478'
--exec DeleteBill 20,666,'2022-10-08','458026651478'
--exec DeleteBill 21,888,'2022-12-06','458026651478'
--exec DeleteBill 22,666,'2021-10-07','458026651478'
--exec DeleteBill 23,888,'2022-12-05','458026651478'



--  פרוצדורות חדרים שמורים ללקוחות
-------------------------------------------------
create proc GetCustomersRooms
as
begin tran	
	select * from [dbo].[Customers_Rooms] order by [Entry_Date] DESC
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetCustomersRooms


create proc GetReservedRoomsByCustomerId
@Customer_ID int
as
begin tran	
SELECT * FROM  ReservationsDetails() WHERE Customer_ID  = @Customer_ID and  [Room_Status] = 'Reserved' 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go 

create proc GetOccupiedRoomsByCustomerId
@Customer_ID int
as
begin tran	
SELECT * FROM  ReservationsDetails() WHERE Customer_ID  = @Customer_ID and  [Room_Status] = 'Occupied' 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go 
--exec GetOccupiedRoomsByCustomerId 206055899




create proc AddNewCustomerRooms
@Room_Number int,
@Bill_Number int,
@Customer_ID int,
@Bill_Date date,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Breakfast Bit,
@Room_Status nvarchar(30)
as
	begin tran
		insert [dbo].[Customers_Rooms] 
			values(@Room_Number,@Bill_Number,@Customer_ID,@Bill_Date,@Entry_Date,@Exit_Date,@Amount_Of_People,@Breakfast,@Room_Status)
	if(@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
	commit tran
go

--exec AddNewCustomerRooms 2,2,222,'2021-01-01','2021-01-01','2021-01-03',1,'Occupied'
--exec AddNewCustomerRooms 20,null,888,'2022-12-06','2022-12-06','2022-12-12',2,'Reserved'
--exec AddNewCustomerRooms 3,3,333,'2021-01-01','2021-01-01','2021-01-05',2,'Reserved'
--exec AddNewCustomerRooms 8,8,888,'2022-12-06','2022-12-06','2022-12-09',8,'Occupied'
--exec AddNewCustomerRooms 5,5,555,'2020-09-12','2020-09-12','2020-09-16',2,'Reserved'
--exec AddNewCustomerRooms 7,7,666,'2022-10-08','2022-10-08','2022-10-15',4,'Occupied'



create proc DeleteCustomerRoom
@id int,
@bill_Number int
as
begin tran	
	DELETE FROM [dbo].[Customers_Rooms] 
	WHERE [Customer_ID] = @id and Bill_Number = @bill_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetCustomersRooms
 --exec DeleteCustomerRoom 1,999,'2022-08-22'
 --exec DeleteCustomerRoom 888,'2022-09-08'


create proc FindCustomerReservations  
@Customer_ID int
as
begin tran	
	select * from [dbo].[Customers_Rooms]
	where [Customer_ID] = @Customer_ID 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--select * from [Customers_Rooms]
-- exec FindCustomerReservations 111111112

SELECT dbo.Customers.First_Name, dbo.Customers.Last_Name
FROM     dbo.Customers_Rooms INNER JOIN
                  dbo.Customers ON dbo.Customers_Rooms.Customer_ID = dbo.Customers.Customer_ID
WHERE  (dbo.Customers_Rooms.Customer_ID = 206055899)
GROUP BY dbo.Customers_Rooms.Customer_ID, dbo.Customers.First_Name, dbo.Customers.Last_Name

create proc AlterCustomerRoom
@Room_Number int,
@Bill_Number int,
@Customer_ID int,
@Bill_Date date,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Breakfast Bit,
@Room_Status nvarchar(30)
as
begin tran	
	UPDATE [dbo].[Customers_Rooms]
	SET 
	[Entry_Date] = @Entry_Date ,
	[Exit_Date]=@Exit_Date, 
	[Customer_ID] = @Customer_ID,
	[Bill_Date] =@Bill_Date,
	[Amount_Of_People] = @Amount_Of_People,
    [Breakfast]= @Breakfast,
	[Bill_Number] = @Bill_Number,
	[Room_Status] = @Room_Status

	WHERE  	[Room_Number] = @Room_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetCustomersRooms
--exec AlterCustomerRoom 8,8,888,'2022-12-06','2022-12-09','2022-09-15',2	,'Reserved'
--exec AlterCustomerRoom 27,16,747474744,'2022-09-13','2022-09-29','2022-10-06'1,'Reserved'
--exec AlterCustomerRoom 24,57,15584444,'2022-09-15','2022-09-20','2022-09-30',4,1,Reserved
--exec AlterCustomerRoom 1,4,666,'2022-09-11','2022-08-22','2022-08-24',5,1,'Occupied'

--select * from Bill_Details where  Customer_ID = 111111117




CREATE FUNCTION Customer_FullName (@Customer_ID int)
RETURNS TABLE
AS
RETURN
(
    SELECT First_Name,Last_Name
    FROM Customers
    WHERE Customer_ID = @Customer_ID
)


SELECT * FROM Customer_FullName(206055899)



exec  GetBookedRooms

CREATE PRO  GetBookedRooms

as

begin tran	
	select * from [dbo].[Customers_Rooms]
	where [Room_Status] = 'Occupied' order by  Customer_ID
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran








    CREATE TABLE   Tbl_customers_inRooms
   (  First_Name nvarchar(30) NOT NULL,
	Last_Name nvarchar(30),
    Room_Number int NOT NULL,
	Bill_Number int ,
	Customer_ID int NOT NULL,
	Bill_Date Date NOT NULL,
	Entry_Date Date NOT NULL,
	Exit_Date Date NOT NULL,
	Amount_Of_People int NOT NULL,
	Breakfast BIT NOT NULL,
	Room_Status nvarchar(30) NOT NULL )




--  מביא את החדרים שתאריך היציאה שלהם גדול מהתאריך של היום
--  מצביא על חדרים תפוסים
drop FUNCTION Customer_FullName (@Customer_ID int)
RETURNS TABLE
AS
RETURN
(
    SELECT First_Name,Last_Name
    FROM Customers
    WHERE Customer_ID = @Customer_ID
)
alter proc GetBookedRooms
as


begin tran	
SELECT dbo.Customers_Rooms.Bill_Number, dbo.Customers_Rooms.Bill_Date, dbo.Customers_Rooms.Customer_ID, dbo.Customers.First_Name, dbo.Customers.Last_Name, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date, 
                  dbo.Customers_Rooms.Room_Number, dbo.Customers_Rooms.Amount_Of_People, dbo.Customers_Rooms.Breakfast, dbo.Customers_Rooms.Room_Status
FROM     dbo.Customers_Rooms INNER JOIN
                  dbo.Customers ON dbo.Customers_Rooms.Customer_ID = dbo.Customers.Customer_ID
WHERE  (dbo.Customers_Rooms.Room_Status = N'Occupied' )
GROUP BY dbo.Customers_Rooms.Bill_Number, dbo.Customers_Rooms.Bill_Date, dbo.Customers_Rooms.Customer_ID, dbo.Customers.First_Name, dbo.Customers.Last_Name, dbo.Customers_Rooms.Entry_Date, 
                  dbo.Customers_Rooms.Exit_Date, dbo.Customers_Rooms.Room_Number, dbo.Customers_Rooms.Amount_Of_People, dbo.Customers_Rooms.Room_Status, dbo.Customers_Rooms.Breakfast
order by  Customer_ID
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran

go
exec GetBookedRooms


--  תביא לי את כול החדרים הפנויים
create FUNCTION AvailableRooms()
returns @Temp TABLE ( Room_Number int ,Room_Type nvarchar(30), Price_Per_Night int, Details nvarchar(100) )                     
as
	begin
		insert @Temp SELECT Room_Number,Room_Type, Price_Per_Night, Details FROM Rooms
		WHERE Room_Number NOT IN (SELECT Room_Number FROM Customers_Rooms)
		RETURN
	end
go

--SELECT * FROM  AvailableRooms() order by Room_Number


create FUNCTION ReservationsDetails()
returns @Temp TABLE (Bill_Number int ,Bill_Date Date,Customer_ID int,Customers_Type int ,First_Name nvarchar(30),Last_Name nvarchar(30),Mail nvarchar(100) , Phone_Number nvarchar(30) ,
Entry_Date Date,Exit_Date Date,Amount_Of_People int,Breakfast Bit,Room_Number int,Price_Per_Night int,Room_Status nvarchar(30))                     
as
	begin
		insert @Temp

SELECT dbo.Bill.Bill_Number, dbo.Bill.Bill_Date, dbo.Customers.Customer_ID, dbo.Customers.Customer_Type, dbo.Customers.First_Name, dbo.Customers.Last_Name, dbo.Customers.Mail, dbo.Customers.Phone_Number, 
                  dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date, dbo.Customers_Rooms.Amount_Of_People,dbo.Customers_Rooms.Breakfast, dbo.Rooms.Room_Number, dbo.Rooms.Price_Per_Night, dbo.Customers_Rooms.Room_Status
FROM     dbo.Bill INNER JOIN
                  dbo.Customers ON dbo.Bill.Customer_ID = dbo.Customers.Customer_ID INNER JOIN
                  dbo.Customers_Rooms ON dbo.Bill.Bill_Number = dbo.Customers_Rooms.Bill_Number AND dbo.Bill.Customer_ID = dbo.Customers_Rooms.Customer_ID AND dbo.Bill.Bill_Date = dbo.Customers_Rooms.Bill_Date INNER JOIN
                  dbo.Rooms ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
		RETURN
	end
go

--SELECT * FROM  ReservationsDetails() order by Customer_ID 
--SELECT * FROM  ReservationsDetails() WHERE Customer_ID  = 666




--  פרוצדורה אשר מבצעת את שמירת החדרים ללקוח
create proc SaveRoomReservation
@id int,
@Card_Holder_Name  nvarchar(30),    -- יצירת פרמטרים הדרושים לביצוע הזמנה 
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(50),
@Employee_ID int,
@Counter_Single int,
@Counter_Double int,
@Counter_Suite int,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Breakfast Bit
as
begin tran	
    
	exec UpdateCustomerCredit @id,@Card_Holder_Name,@Credit_Card_Date,@Three_Digit,@Credit_Card_Number  ---הפעלת פרוצדורה המעדכנת פרטי כ.אשראי ביטחון של לקוח על פי ת.ז


	DECLARE @Bill_Date as date = (select Bill_Date from Bill where Customer_ID = @id and Bill_Status = 'Open') --- מציאת תאריך החשבונית על פי ת.ז לקוח וסטוטס חשבונית פתוחה
	DECLARE @date as date = GETDATE() --  השגת התאריך הנוכחי


	if (@Bill_Date is null)--- עדכון פרטים בחשבונית פתוחה במידה וקיימת אחרת יצירת חשבונית חדשה ללקוח
		exec AddNewBill @Employee_ID, @id,@Credit_Card_Number ,@date,'Open'


	set @Bill_Date = (select Bill_Date from Bill where Customer_ID = @id and Bill_Status = 'Open')--- מציאת תאריך החשבונית על פי ת.ז לקוח וסטוטס חשבונית פתוחה
	DECLARE @bill_number as int = (select Bill_Number from Bill where Customer_ID = @id and Bill_Status = 'Open') --- מציאת מספר החשבונית על פי ת.ז לקוח וסטוטס חשבונית פתוחה
	DECLARE @room_number as int


	while @Counter_Single > 0    -----   הקצאה ושמירה של חדרים ללקוח לפי כמות החדרים שמעוניין , סוג ,כמות ובאם סטטוס החדר פנוי 

		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Single room') --- מציאת מספר החדר הכי נמוך מתוך רשימה של חדרים ליחיד שפנויים
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number) --- אם החדר אינו מופיע ברשימת החדרים של לקוחות בצע
			exec AddNewCustomerRooms @room_number, @bill_number,@id,@Bill_Date,@Entry_Date,@Exit_Date,@Amount_Of_People,@Breakfast,'Reserved' ---  הפעל את הפרוצדורה מוסיפה אותו לטבלה
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@date,@Entry_Date,@Exit_Date,@Amount_Of_People,@Breakfast,'Reserved' -- אחרת הפעל את הפרוצדורה המשנה את הפרטים שלו
		set @Counter_Single = @Counter_Single - 1
		end

	while @Counter_Double > 0  -----   הקצאה ושמירה של חדרים ללקוח לפי כמות החדרים שמעוניין , סוג ,כמות ובאם סטטוס החדר פנוי 
		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Double room')--- מציאת מספר החדר הכי נמוך מתוך רשימה של חדרים לזוג שפנויים
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number)--- אם החדר אינו מופיע ברשימת החדרים של לקוחות בצע
	exec AddNewCustomerRooms @room_number, @bill_number,@id,@Bill_Date,@Entry_Date,@Exit_Date,@Amount_Of_People,@Breakfast,'Reserved' ---  הפעל את הפרוצדורה מוסיפה אותו לטבלה
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@date,@Entry_Date,@Exit_Date,@Amount_Of_People,@Breakfast,'Reserved'-- אחרת הפעל את הפרוצדורה המשנה את הפרטים שלו
		set @Counter_Double = @Counter_Double - 1
		end

	while @Counter_Suite > 0  -----   הקצאה ושמירה של חדרים ללקוח לפי כמות החדרים שמעוניין , סוג ,כמות ובאם סטטוס החדר פנוי 
		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Suite')--- מציאת מספר החדר הכי נמוך מתוך רשימה של חדרים סוויטה שפנויים
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number)--- אם החדר אינו מופיע ברשימת החדרים של לקוחות בצע
	exec AddNewCustomerRooms @room_number, @bill_number,@id,@Bill_Date,@Entry_Date,@Exit_Date,@Amount_Of_People,@Breakfast,'Reserved'---  הפעל את הפרוצדורה מוסיפה אותו לטבלה
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@date,@Entry_Date,@Exit_Date,@Amount_Of_People,@Breakfast,'Reserved'-- אחרת הפעל את הפרוצדורה המשנה את הפרטים שלו
		set @Counter_Suite = @Counter_Suite - 1
		end

	if (@@error !=0) ----הצגת הודעת שגיאה במידה ומתקבלת שגיאה  
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go



select * from  AvailableRooms()









--exec SaveRoomReservation 111111112,'mmm','12/29',912,'4580111133335555',111,1,1,1,'2022-08-22','2022-08-24',5,1
--select * from [dbo].[Customers]
--select * from Bill
--


[object Object],[object Object],[object Object],[object Object][object Object],[object Object]
[object Object],[object Object],[object Object],[object Object][object Object],[object Object]




--select * from [dbo].[Bill_Details]
--exec DeleteReservation 666
--exec AddNewBill_Detail 111111112,21,'Coca cola',9,'Cash'
--exec CheckIn 111111112, '2022-08-22'
--exec CheckOut 111111112, '2022-08-24'
exec Room_Resit 111111119
exec GetAllCustomersHistory 111111119
DELETE from Purchases_Documentation where Bill_Number= 12
--select * from Bill_Details
--where Customer_ID = 111111112
--select * from [dbo].[Customers_Rooms]
--select * from [dbo].[Employees]
--select * from [dbo].[Employees_Types]
--select * from [dbo].[Employees_Tasks]
    --"CustomerID": 666,
    --"CardHolderName": "mmm",
    --"CreditCardDate": "12/29",
    --"ThreeDigit": 912,
    --"CreditCardNumber": "4580111133335555",
    --"EmployeeID": 111,
    --"CounterSingle" :1,
    --"CounterDouble": 1,
    --"CounterSuite": 1,
    --"EntryDate": "2022-08-22",
    --"ExitDate": "2022-08-24",
    --"AmountOfPeople": 5 ,
    --"Breakfast":true
--exec GetReservedRoomsByCustomerId 111111112

exec GetReservedRoomsByCustomerId 206055899
create proc DeleteReservation
@id int
as
	begin tran	
	declare  @bill_Number as int = (SELECT MAX([Bill_Number]) as max_items
	FROM Bill where [Customer_ID] = @id)

	DELETE FROM [dbo].[Customers_Rooms] WHERE [Customer_ID] = @id 
	UPDATE [dbo].[Bill] 
	SET Bill_Status = 'Close'
	where [Customer_ID] = @id and [Bill_Number] = @bill_Number

	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec DeleteReservation 666
--select * from Bill
--select * from [dbo].[Customers_Rooms] 



create proc Room_Resit      
@id int
as
begin tran		

declare @bill_number as int = (select [Bill_Number] from Bill 
  where Customer_ID = @id and Bill_Status = 'Open')
	SELECT dbo.Bill_Details.Bill_Number, dbo.Bill_Details.Customer_ID, dbo.Bill_Details.Bill_Date, dbo.Bill_Details.Room_Number, 
	dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night,  
	dbo.Customers_Rooms.Amount_Of_People,dbo.Customers_Rooms.Breakfast,
	 dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date,
	(SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date))AS Number_Of_Nights,
	dbo.Bill_Details.Payment_Method,dbo.Bill_Details.Product_Code
	FROM     dbo.Customers_Rooms INNER JOIN
			dbo.Bill_Details ON dbo.Customers_Rooms.Room_Number = dbo.Bill_Details.Room_Number INNER JOIN
			dbo.Rooms ON dbo.Bill_Details.Room_Number = dbo.Rooms.Room_Number
	WHERE  (dbo.Bill_Details.Product_Code = 8 and dbo.Bill_Details.Bill_Number = @bill_number)
	union all
	SELECT dbo.Bill_Details.Bill_Number, dbo.Bill_Details.Customer_ID, dbo.Bill_Details.Bill_Date,
	dbo.Bill_Details.Room_Number, dbo.Products.Description, dbo.Products.Price_Per_Unit, 
	dbo.Products.Discount_Percentage, dbo.Bill_Details.Breakfast, dbo.Bill_Details.Purchase_Time,
     dbo.Bill_Details.Purchase_Time,dbo.Bill_Details.Amount, dbo.Bill_Details.Payment_Method, dbo.Bill_Details.Product_Code
			FROM  dbo.Bill_Details INNER JOIN
                  dbo.Products ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code INNER JOIN
                  dbo.Bill ON dbo.Bill_Details.Bill_Number = dbo.Bill.Bill_Number
	where (dbo.Bill_Details.Product_Code != 8 and dbo.Bill_Details.Customer_ID = @id)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec Room_Resit 111111119
--select * from Bill
--exec GetCustomersRooms
--select * from Bill_Details
--select * from [dbo].[Purchases_Documentation]

DELETE FROM Purchases_Documentation
WHERE Customer_ID = 206055899


create trigger AddRoomToDetails  ---- (טריגר להכנסת רשומה חיוב על חדר חדשה לטבלת פרטי חשבונית של לקוח , מופעל כאשר ססטוס חדר בטבלת ההזמנות משתנה למאוכלס (לקוח ביצע צ'ק אין  
on [Customers_Rooms] for update -- כאשר מופעלת פעולת עידכון על הטבלה "חדרי לקוחות" בצע
as
	if exists (select Room_Number from inserted where [Room_Status] = 'Occupied') --  אם קיים מספר חדר שהסטטוס שלו פנוי בצע
	begin
		insert [dbo].[Bill_Details]  --- הוסף לטבלת "פירטי החשבונית" את השדות הרלוונטים 
			select Bill_Number, Customer_ID, Bill_Date, Room_Number,Entry_Date,8,1,getdate(),Breakfast ,'Credit'
			 from inserted
	end
go
--select * from [dbo].[Bill_Details] where Customer_ID = 206055899



--  פרוצדורה עבור צאק אין
--לעדכן פרוצדורה שתבדוק אם התאריך  כניסה שווה לתאריך שבו נעשה הצאק אין 
create proc CheckIn
@id int,
@entry_date date
as
begin tran	
	UPDATE [dbo].[Customers_Rooms]
	SET 
	[Room_Status] = 'Occupied'
	WHERE  	[Customer_ID] = @id and [Entry_Date] = @entry_date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

 --exec CheckIn 111111112 , '2022-08-22'
 --exec CheckOut 111111112, '2022-10-27'
    --"id": 666,
    --"Entry_Date": "2022-08-22"
--select * from [dbo].[Customers_Rooms]
--select * from [dbo].[Bill_Details]


create proc CheckIn_With_Existing_User
@id int,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(16),
@Employee_ID int,
@Counter_Single int,
@Counter_Double int,
@Counter_Suite int,
@Entry_Date date,
@Exit_Date date,SaveRoomReservation
@Amount_Of_People int,
@Breakfast Bit
as
	begin tran	
		exec  @id ,@Card_Holder_Name ,@Credit_Card_Date ,@Three_Digit 
		,@Credit_Card_Number ,@Employee_ID ,@Counter_Single ,@Counter_Double ,@Counter_Suite 
		,@Entry_Date ,@Exit_Date ,@Amount_Of_People ,@Breakfast
		exec CheckIn @id , @Entry_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec CheckIn_With_Existing_User 666,'mmm','12/29',912,'4580111133335555',111,1,1,1,'2022-08-22','2022-08-24',5,1
--select * from Customers
--select * from Bill
--select * from [dbo].[Customers_Rooms]
--select * from [dbo].[Bill_Details]


create proc CheckIn_Without_Existing_User
@id int,
@First_Name nvarchar(30),
@Last_Name nvarchar(30),
@Mail nvarchar(100),
@Password nvarchar(30),
@Phone_Number nvarchar(30) ,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(12),
@Employee_ID int,
@Counter_Single int,
@Counter_Double int,
@Counter_Suite int,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Breakfast Bit
as
begin tran	
		exec AddNewCustomer @id,1,@First_Name,@Last_Name,@Mail,@Password,@Phone_Number,@Card_Holder_Name,
		@Credit_Card_Date,@Three_Digit,@Credit_Card_Number

		exec SaveRoomReservation @id ,@Card_Holder_Name ,@Credit_Card_Date ,@Three_Digit 
		,@Credit_Card_Number ,@Employee_ID ,@Counter_Single ,@Counter_Double ,@Counter_Suite ,@Entry_Date
		,@Exit_Date ,@Amount_Of_People ,@Breakfast

		exec CheckIn @id , @Entry_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go


--exec CheckIn_Without_Existing_User 315201913,'maor','shtern','maor@gmail.com','0000','0526211881','mmm','12/29',
--912,'4580111133335555',111,1,1,1,'2022-08-22','2022-08-24',5,True
  --"CustomerID": 315201913,
  --  "CustomerType":1,
  --  "FirstName":"maor",
  --  "LastName":"shtern",
  --  "Mail":"maor@gmail.com",
  --  "PhoneNumber":"0526211881",
  --  "CardHolderName": "mmm",
  --  "CreditCardDate": "12/29",
  --  "ThreeDigit": 912,
  --  "CreditCardNumber": "4580111133335555",
  --  "EmployeeID": 111,
  --  "CounterSingle" :1,
  --  "CounterDouble": 1,
  --  "CounterSuite": 1,
  --  "EntryDate": "2022-08-22",
  --  "ExitDate": "2022-08-24",
  --  "AmountOfPeople": 5 ,
  --  "Breakfast":true

-- select * from [dbo].[Customers]
--select * from Bill
--select * from [dbo].[Customers_Rooms]
--select * from [dbo].[Bill_Details]




--  פרוצדורה לשמירת הנתוני הרכישות
alter proc AddPurchases_Documentation
as
--print(@id)
--exec Room_Resit 222
	insert into [dbo].[Purchases_Documentation] exec Room_Resit @id
go
--exec AddPurchases_Documentation 222 
--exec GetWorkersOnShift
--select * from [dbo].[Customers_Rooms]
--exec Room_Resit 111111117

exec GetTask_ById 444

create proc CheckOut      
@id int,
@Exit_Date date              --------- יצירת פרמטרים הדרושים לביצוע צ'ק אאוט ללקוח  
as
begin tran		
	exec AddPurchases_Documentation @id -----הרצה של פרוצדורה השומרת את כל הרכישות של הלקוח לפי ת.ז בטבלת תיעוד רכישות  
	DECLARE @bill_Number AS int = (select Bill_Number from [dbo].[Customers_Rooms]
	where [Customer_ID] = @id and Exit_Date = @Exit_Date GROUP BY Bill_Number)  --- הצלבה של הנתונים שהתקבלו כקלט אל מול הנתונים השמורים במסד הנתונים ועדכון של סטטוס חשבונית סגור אם אומתו
	UPDATE [dbo].[Bill] SET Bill_Status = 'Close'
	where Customer_ID=@id and Bill_Number = @bill_Number and Bill_Status = 'Open'
    exec DeleteBill_Detail @id,@bill_Number      ---- הרצה של פרוצדורות המוחקות נתוני לקוח בטבלאות הרלוונטיות
	exec DeleteCustomerRoom @id , @bill_Number
	if (@@error !=0) ----הצגת הודעת שגיאה במידה ומתקבלת שגיאה
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllBilles
--exec GetAllBill_Details
--exec GetCustomersRooms
--select * from [dbo].[Purchases_Documentation]
 --exec CheckOut 111111112, '2022-08-24'





--  פרוצדורות פרטי רכישות
create proc GetAllBill_Details
as
begin tran	
	select * from [dbo].[Bill_Details]
	order by Bill_Date 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetAllBill_Details
--exec GetAllTasks



create proc GetBill_DetailsByNumber
@Bill_Number int
as
begin tran	
	select * from [dbo].[Bill_Details]
	where Bill_Number = @Bill_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetBill_DetailsByNumber 1
exec GetBookedRooms


create proc AddNewBill_Detail
@id int,
@Room_Number int,
@Product_Dec nvarchar(30),
@Amount int,
@Payment_Method nvarchar(20)
as
begin tran	
	DECLARE @Purchase_Date as date =  GETDATE()

	DECLARE @bill_number as int = (select Bill_Number from  [dbo].[Customers_Rooms] 
	where [Customer_ID] = @id and Room_Number = @Room_Number)

	DECLARE @bill_date as date = (select Bill_Date from  [dbo].[Customers_Rooms] 
	where [Customer_ID] = @id and Room_Number = @Room_Number)

	DECLARE @Product_Code as int = (select [Product_Code] from [dbo].[Products] where [Description] = @Product_Dec)


	insert [dbo].[Bill_Details]
	values (@bill_number,@id, @bill_date,@Room_Number, @Purchase_Date, @Product_Code, @Amount,getdate(),
	(select  TOP 1 [Breakfast] from [dbo].[Bill_Details] 
	where [Customer_ID] = @id ),@Payment_Method)

	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec AddNewBill_Detail 111111112,21,'Coca cola',9,'Cash'
   --"CustomerID":315201913, 
   -- "RoomNumber":21,
   -- "ProductDec":"Coca cola",
   -- "Amount":9,
   -- "PaymentMethod":"Cash"
  
--select * from [dbo].[Bill_Details] where Customer_ID = 206055899
--select * from [dbo].[Customers_Rooms]
--exec CheckOut 666 , '2022-08-24'
--exec Room_Resit 206055899
--select * from [dbo].[Bill_Details]
--where [Customer_ID] = 111111112



create proc DeleteBill_Detail
@id int,
@bill_Number int
as
begin tran		
	DELETE FROM [dbo].[Bill_Details] 
	WHERE [Customer_ID] = @id and Bill_Number = @bill_Number 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllBill_Details
-- exec DeleteBill_Detail 41,315201913


create proc AlterBill_Detail
@Bill_Number int,
@Product_Code int,
@Amount int,
@Purchase_Date date,
@Purchase_Time time,
@Payment_Method nvarchar(20)
as
begin tran		
	UPDATE [dbo].[Bill_Details]
	SET Bill_Number = @Bill_Number , Product_Code = @Product_Code, 
	Amount = @Amount , [Payment_Method]  = @Payment_Method 
	WHERE Bill_Number = @Bill_Number and Product_Code = @Product_Code
	and Purchase_Date = @Purchase_Date and Purchase_Time = @Purchase_Time
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
 --exec AlterBill_Detail 1,2,10,'2021-12-12','13:00','Cash'


create proc GetAllCustomersHistory
@id int
as
begin tran		
	select * from dbo.Purchases_Documentation where [Customer_ID] = @id
	order by [Bill_Number] desc
if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go 
--select * from [dbo].[Bill]
--exec GetAllCustomersHistory 111111112 
--select * from dbo.Purchases_Documentation



create proc AddRoomServiceRequest
@employee_ID int,
@task_Name nvarchar(30),
@room_Number int,
@date date,
@time nvarchar(5),
@description nvarchar(250),
@customer_ID int,
@Product_Dec nvarchar(30),
@Amount int,
@Payment_Method nvarchar(20)
as
	begin tran		
	if(@task_Name != 'Product purchase')
		begin
			exec AddNewTask @employee_ID,@task_Name , @description,@room_Number
		print(@Task_Name)
		end
	else
		begin
			exec AddNewBill_Detail @customer_ID,@room_Number,@Product_Dec,@Amount,@Payment_Method
			declare @desc as nvarchar(30) = ('get room ' + (select cast(@room_Number as nvarchar(5)))
			+ ' ' +  (select cast(@Amount as nvarchar(5))) + ' of ' 
			+ @Product_Dec)
			exec AddNewTask @employee_ID,@task_Name , @desc,@room_Number
		end

	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--declare @date as date = (select FORMAT(getdate(), 'yyyy-MM-dd'))
--declare @time as VARCHAR(5) = (SELECT CONVERT(VARCHAR(5), GETDATE(), 108))
--exec AddRoomServiceRequest 111,'Product purchase',23,@date,@time,null,222,'Coca cola',2,'Cash'

--declare @date as date = (select FORMAT(getdate(), 'yyyy-MM-dd'))
--declare @time as VARCHAR(5) = (SELECT CONVERT(VARCHAR(5), GETDATE(), 108))
--exec AddRoomServiceRequest 111,'Room Cleaning',5,@date,@time,null,222,'Coca cola',2,'Cash'




exec AddNewTask 333,'ccc',6,'Room Service','2022-11-21','09:51','','Open','Pizza'

--exec AddNewTask 333,2,'Room Cleaning','13:00',null,'Close',''	
--exec AddRoomServiceRequest null,5,'Refill mini bar','16:00',null,'Open',''	
--select * from [dbo].[Employees_Tasks]
--select * from Shifts
--exec ClockIn 333,'11:00' 
--exec GetAllShifts
--select * from Tasks_Types
--exec GetAllTasks

--declare @date as date = (select FORMAT(getdate(), 'yyyy-MM-dd'))
--declare @time as VARCHAR(5) = (SELECT CONVERT(VARCHAR(5), GETDATE(), 108))
--exec AddRoomServiceRequest null,'Change of towels','fyrtyrtyrty',18
--@employee_ID,@task_Name , @description,@room_Number


-- ======================================================================
-- ----------------------- דוחות ---------------------------------------
-- ======================================================================


create proc Number_Of_Visitors_Per_Month
as
	begin tran		
		select  CAST(YEAR(Bill_Date) AS VARCHAR(4)) as Date
		,DATENAME(MONTH,Bill_Date) as Month_Name,Count(Bill_Date)AS Amount from [dbo].[Purchases_Documentation]
		where [Product_Code] = 8
		GROUP by  CAST(YEAR(Bill_Date) AS VARCHAR(4)),
		DATENAME(MONTH,Bill_Date)
		order by Amount
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec Number_Of_Visitors_Per_Month
--select * from [dbo].[Purchases_Documentation]

--select * from Bill_Details  where Customer_ID =666


alter proc Amount_Of_Products_Purchased_In_The_Store
as
	begin tran		
		SELECT dbo.Purchases_Documentation.Product_Code as Code,
		dbo.Purchases_Documentation.Room_Type  as Product, 
		sum (dbo.Purchases_Documentation.Number_Of_Nights) as Amount,
		dbo.Category.Description as Category
		FROM dbo.Purchases_Documentation INNER JOIN
		dbo.Products ON dbo.Purchases_Documentation.Product_Code = dbo.Products.Product_Code INNER JOIN
		dbo.Category ON dbo.Products.Category_Number = dbo.Category.Category_Number
		WHERE  (dbo.Purchases_Documentation.Product_Code <> 8)
		GROUP BY dbo.Purchases_Documentation.Product_Code, dbo.Purchases_Documentation.Room_Type,
		dbo.Category.Description
		ORDER BY Amount DESC
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
exec Amount_Of_Products_Purchased_In_The_Store
--select * from dbo.Purchases_Documentation
--select * from dbo.Products



--insert dbo.Purchases_Documentation 
--values(4,'315201913','2022-09-21',21,'Suite',500,5,1,2,'Credit','2022-08-22',8)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',11,'Double room',300,5,1,2,'Credit','2022-08-22',8)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',1,'Single room',100,5,1,2,'Credit','2022-08-22',8)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',13,'Vodka',35,5,1,6,'Credit','2022-08-22',2)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',13,'Coca cola',15,5,1,20,'Credit','2022-08-22',1)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',13,'Doritos',20,2,1,30,'Credit','2022-07-22',4)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',13,'Sprite',15,2,1,6,'Credit','2022-08-22',5)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',13,'Whiskey',45,2,1,50,'Credit','2022-08-22',6)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',13,'Chips',20,2,1,6,'Credit','2022-08-22',7)
--insert dbo.Purchases_Documentation 
--values(1,'315201913','2022-09-21',13,'Bamba',20,2,1,19,'Credit','2022-08-22',3)



create proc Number_of_tasks_per_month
as
begin tran		
	SELECT CAST(YEAR(Start_Date) AS VARCHAR(4))  as Year
	,DATENAME(MONTH,Start_Date) as Month, count(MONTH(Start_Date)) as Amount FROM Employees_Tasks 
	GROUP by CAST(YEAR(Start_Date) AS VARCHAR(4)) ,
	DATENAME(MONTH,Start_Date)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec Number_of_tasks_per_month



alter proc ProductPurchaseByName
@Description nvarchar(30)
as
begin tran		
	SELECT dbo.Purchases_Documentation.Product_Code as Code,
		dbo.Purchases_Documentation.Room_Type  as Product, 
		sum (dbo.Purchases_Documentation.Number_Of_Nights) as Amount,
		dbo.Category.Description as Category
		FROM dbo.Purchases_Documentation INNER JOIN
		dbo.Products ON dbo.Purchases_Documentation.Product_Code = dbo.Products.Product_Code INNER JOIN
		dbo.Category ON dbo.Products.Category_Number = dbo.Category.Category_Number
		WHERE  (dbo.Purchases_Documentation.Product_Code <> 8 
		and dbo.Purchases_Documentation.Room_Type = @Description)
		GROUP BY dbo.Purchases_Documentation.Product_Code, dbo.Purchases_Documentation.Room_Type,
		dbo.Category.Description
if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec ProductPurchaseByName 'Bamba'
--exec ProductPurchaseByName 'Coca cola'
--select * from dbo.Purchases_Documentation 



alter proc Income_And_Expenses
as
begin tran		
	
	SELECT CAST(YEAR(Purchase_Date) AS VARCHAR(4)) + '-' + CAST(MONTH(Purchase_Date) AS VARCHAR(2)) as Date 
	,CAST( Sum([Sum_Total] * -1 ) as float) as [Expens + / Profit -]  
	from [dbo].[Purchase_Of_Goods] 	

	GROUP BY CAST(YEAR(Purchase_Date) AS VARCHAR(4)) + '-' + CAST(MONTH(Purchase_Date) AS VARCHAR(2))
	union all 
	select  CAST(YEAR(Purchase_Date) AS VARCHAR(4)) + '-' + CAST(MONTH(Purchase_Date) AS VARCHAR(2)) as Date 	
	,CAST(Sum([Price_Per_Night])as float) as [Expens/Profit]  
	
	from dbo.Purchases_Documentation 

	GROUP BY CAST(YEAR(Purchase_Date) AS VARCHAR(4)) + '-' + CAST(MONTH(Purchase_Date) AS VARCHAR(2))

	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
exec Income_And_Expenses

select * from [dbo].[Purchase_Of_Goods] 	
select * from dbo.Purchases_Documentation




--select * from [dbo].[Bill]
--where [Customer_ID]= 111111112
--select * from [dbo].[Customers_Rooms]
--where [Customer_ID]= 111111112
--select * from [dbo].[Bill_Details]
--where [Customer_ID]= 111111112

--select * from [dbo].[Employees]
--select * from [dbo].[Shifts]
--select * from [dbo].[Employees_Tasks]
--select * from [dbo].[Customers]
--select * from [dbo].[Purchases_Documentation]

delete from [dbo].[Purchases_Documentation] where Customer_ID = 206055899

