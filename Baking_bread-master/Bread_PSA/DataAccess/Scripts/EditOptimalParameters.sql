update [MilkDB].[dbo].[Parameters_Info]
set [Optimal_Value] = @level
where [P_ID] = 3001

update [MilkDB].[dbo].[Parameters_Info]
set [Optimal_Value] = @temperature
where [P_ID] = 3000

SELECT[Optimal_value]
FROM [MilkDB].[dbo].[Parameters_Info]