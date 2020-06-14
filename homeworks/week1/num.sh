#!/bin/bash
# Program: creat .js files in order
#

for ((i=1; i<=$1; i=i+1))
do
	touch "$i.js"
done
echo "file(s) created.";
