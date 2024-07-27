//show mission details - title, desc, ap, total tasks, completed tasks, late and remaining tasks

//we will use the api for mission detail, get all information from api and calculate late, total tasks and remaining tasks in FE

//case 1 - when the task expected end date is lesser than current date and is not completed, then it is a late task 
//case 2 - when the task expected end date is lesser than completion date, then it is a late task
//case 3 - not late