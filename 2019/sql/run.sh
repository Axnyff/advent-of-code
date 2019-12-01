if [ $# -eq 0 ]
  then
    psql -d advent -h localhost -U advent
  else
    psql -d advent -h localhost -U advent -f $1
fi
