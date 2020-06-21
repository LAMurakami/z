#!/bin/bash

<<PROGRAM_TEXT

This script will rebuild an archive of /var/www/z resources
 if any of the resources have been changed or added.

The archive is extracted on a new instance with:

tar -xvzf /mnt/efs/aws-lam1-ubuntu/z.tgz --directory /var/www

The following will list files changed since the archive was last rebuilt:

if [ $(find /var/www/z -newer /mnt/efs/aws-lam1-ubuntu/z.tgz -print \
 | sed 's|^/var/www/z/||' | grep -v '.git/' | grep -v '.git$' | wc -l) \
 -gt 0 ]
then
  find /var/www/z -newer /mnt/efs/aws-lam1-ubuntu/z.tgz \
  | grep -v '.git/' | grep -v '.git$' \
  | xargs ls -ld --time-style=long-iso  | sed 's|/var/www/z/||' 
fi

PROGRAM_TEXT

if [ $(find /var/www/z -newer /mnt/efs/aws-lam1-ubuntu/z.tgz -print \
| sed 's|^/var/www/z/||' | grep -v '.git/' \
| grep -v '.git$' | wc -l) -gt 0 ]; then

  echo Recreating the aws-lam1-ubuntu/z.tgz archive

  rm -f /mnt/efs/aws-lam1-ubuntu/z.t{gz,xt}

  tar -cvzf /mnt/efs/aws-lam1-ubuntu/z.tgz \
  --exclude='z/.git' \
  --exclude='z/html/RCS' \
  --directory /var/www z 2>&1 \
  | tee /mnt/efs/aws-lam1-ubuntu/z.txt

fi
