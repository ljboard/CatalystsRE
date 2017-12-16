FROM ubuntu:17.04
LABEL author="Zack Ulissi <zulissi@andrew.cmu.edu>"

RUN apt-get update
RUN apt-get dist-upgrade -y
RUN apt install wget bzip2  git build-essential libgl1-mesa-glx -y

RUN apt-get install -y curl
RUN apt-get install default-jre -y
RUN /bin/bash -c "curl -sL https://deb.nodesource.com/setup_8.x | bash -"
RUN apt-get install -y nodejs
RUN wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.0.0.deb
RUN /bin/bash -c "dpkg -i elasticsearch-6.0.0.deb "
EXPOSE 9200

ADD ./ /home/CatalystsRE
RUN /bin/bash -c "cd /home/CatalystsRE;npm install"
EXPOSE 3000

ADD /start.sh /home/
