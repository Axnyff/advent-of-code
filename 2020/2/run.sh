if [ $# -eq 0 ]
  then
    PGPASSWORD=advent psql -d advent -h localhost -U advent
  else
    PGPASSWORD=advent psql -d advent -h localhost -U advent -f $1
fi
