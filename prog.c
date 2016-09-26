main(){
int pid;
pid=fork();
if (pid==0){
printf("proceso hijo");
exit(0);
}
else{
while(1);
}
}
