FROM java:8
MAINTAINER  Cristian Barrientos "cs3kns@gmail.com"

ENV SOLR_VERSION 5.2.1
ENV SOLR solr-$SOLR_VERSION
ENV SOLR_USER solr

RUN export DEBIAN_FRONTEND=noninteractive && \
  apt-get update && \
  apt-get -y install \
    curl \
    lsof \
    supervisor \
    procps && \
    groupadd -r $SOLR_USER && \
    useradd -r -g $SOLR_USER $SOLR_USER && \
    mkdir -p /opt && \
    mkdir -p /var/solr && \
    wget -nv --output-document=/opt/$SOLR.tgz http://www.us.apache.org/dist/lucene/solr/$SOLR_VERSION/$SOLR.tgz && \
    tar xzf /opt/$SOLR.tgz $SOLR/bin/install_solr_service.sh --strip-components=2 && \
    chown -R $SOLR_USER:$SOLR_USER /var/solr/ && \
    chown -R $SOLR_USER:$SOLR_USER /opt



EXPOSE 8080

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ADD criminals-schema.xml /var/solr/data/criminals/conf/managed-schema
ADD mapping-ISOLatin1Accent.txt /var/solr/data/criminals/conf/lang/mapping-ISOLatin1Accent.txt
COPY conf /var/solr/data/criminals/conf
ADD script.sh /opt/solr-script/initScript.sh
RUN chmod 755 /opt/solr-script/initScript.sh
# ENTRYPOINT ["/opt/solr-script/initScript.sh"]
# CMD ["app:start"]
