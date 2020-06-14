#!/bin/bash
# show github user info
# "name", "bio", "location","blog"



curl https://api.github.com/users/$1 | grep -Ew 'name|bio|location|blog' | cut -d '"' -f 4,7,10,13



