INSERT INTO [MilkDB].[dbo].[Status_Elements_Log](
[C_ID],
[E_ID],
[Status],
[Time])
values(
@C_ID,
@E_ID1,
@Status,
SYSDATETIME())
SELECT CAST(SCOPE_IDENTITY() as int)

INSERT INTO [MilkDB].[dbo].[Status_Elements_Log](
[C_ID],
[E_ID],
[Status],
[Time])
values(
@C_ID,
@E_ID2,
@Status,
SYSDATETIME())
SELECT CAST(SCOPE_IDENTITY() as int)

