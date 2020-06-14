#!/bin/bash
# show github user info
# "name", "bio", "location","blog"



curl -s https://api.github.com/users/$1 | grep -w 'name' | cut -d '"' -f 4
curl -s https://api.github.com/users/$1 | grep -w 'bio' | cut -d '"' -f 4
curl -s https://api.github.com/users/$1 | grep -w 'location' | cut -d '"' -f 4
curl -s https://api.github.com/users/$1 | grep -w 'blog' | cut -d '"' -f 4