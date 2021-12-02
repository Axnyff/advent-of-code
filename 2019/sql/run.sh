if [ $# -eq 0 ]
  then
    psql -d travauxlib -h localhost -U play
  else
    psql -d travauxlib -h localhost -U play -f $1
fi
