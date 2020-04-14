update [MilkDB].[dbo].[Process_Parameters]
set [Value] = case 
 when [Value] < @optimalLvl and @temp = 15 
  then [Value] + @ll
 when @temp >= (@optimalTemp - 0.0001)
  then [Value] - @ll
 else
  [Value]
 end
where [P_ID] = 3001

update [MilkDB].[dbo].[Process_Parameters]
set [Value] = case 
 when [Value] < (@optimalTemp - 0.0001) and @lvl >= @optimalLvl
  then @T
 else
  [Value]
 end
where [P_ID] = 3000

update [MilkDB].[dbo].[Process_Parameters]
set [Value] = case 
 when [Value] >= (@optimalTemp - 0.0001) and @lvl < 3
  then 15
 else
  [Value]
 end
where [P_ID] = 3000

select [P_ID], [Value]
from [MilkDB].[dbo].[Process_Parameters]