FROM scratch

EXPOSE 8080
COPY excaliown /usr/bin/excaliown
ENTRYPOINT ["/usr/bin/excaliown"]
