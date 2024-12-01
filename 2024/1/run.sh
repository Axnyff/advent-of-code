if [ $# -eq 0 ]
  then
    psql -d hemea -h localhost -U hemea
  else
    psql -d hemea -h localhost -U hemea -f $1
fi
