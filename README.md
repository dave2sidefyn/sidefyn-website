sidefyn.ch Website
===================================

## Environment Dependencies
* Apache >= 2.2
* PHP >= 5.4

## Setup development environment

Windows developers need to do this first:
1. Install [Ruby](https://www.ruby-lang.org/en/installation/)
2. Install [xsltproc](http://www.zlatkovic.com/libxml.en.html) and add it to your PATH

Notes:
We have successfully tested the following versions:
* Ruby 1.9.3  								-> http://rubyinstaller.org/downloads/
* DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe	-> http://rubyinstaller.org/downloads/
The installation process are described under the following link: 
* Ruby 		-> https://forwardhq.com/help/installing-ruby-windows
* xsltproc 	-> http://www.sagehill.net/docbookxsl/InstallingAProcessor.html

For all:
1. Install [nodejs](http://nodejs.org/)
2. Execute the following in the project dir:

```
gem install sass
gem install compass
npm install -g bower
npm install -g grunt-cli
npm install
```

Notes:
Using gem, all software packages are installed under the HOME directory. 
As default, the home directory is mounted to P:
On windows, you could change it using the following command:
SET HOME=%USERPROFILE%
Make sure, that the bin-Folder of the HOME-directory is in the path:
PATH add C:\Users\wexa\bin
Executables, such as grunt, are persisted in this folder.

## Compiling

### During development

Compiling the site happens automatically when the Grunt file watcher is active.
Start it like so:
```
grunt watch
```
Alternatively you can trigger compilation manually:
```
grunt
```

### For production

To compile the site without source maps and all that nifty debug stuff, execute the following:
```
grunt prod
```

## Branching & Deployment

The stable branch is 'prod'.
Changes are first to be tested on 'stage' before being merged into 'prod' branch.

## Directories

* <code>app/</code>: PHP Code that handles which template and which locale has to be loaded.
* <code>public/dist/</code>: The generated site. **Do not change anything manually!**
* <code>public/src/</code>: All the files that consist of the public part of the site.
* <code>public/src/data/</code> contains the different pages in their locales defined in XML
* <code>public/src/xsl/</code> contains the XSLT files which transform the XML into HTML

## Test it on XAMPP

1. Download and install XAMPP (https://www.apachefriends.org/de/download.html)
2. Add the following line to you hosts-file (C:\Windows\System32\drivers\etc\hosts)

127.0.0.1 sidefyn.local #xamp virtual host

3. Create a virtual host by adding the following lines to the httpd-vhosts.conf (C:\applications\xampp\apache\conf\extra) file:

NameVirtualHost *
  
<VirtualHost *>
    DocumentRoot "C:\applications\xampp\htdocs"
    ServerName localhost
</VirtualHost>
<VirtualHost *>
    DocumentRoot "C:\projects\web\sidefyn.ch"
    ServerName sidefyn.local
    <Directory  "C:\projects\web\sidefyn.ch">
        Options All
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

4. Start XAMPP
5. The page is locally available under http://sidefyn.local/