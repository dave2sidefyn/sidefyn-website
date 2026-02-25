<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:param name="build-date"/>

    <xsl:output method="html" encoding="utf-8" indent="yes"/>

    <xsl:strip-space elements="*"/>

    <xsl:include href="subpage.xsl"/>

    <xsl:template match="/">
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html></xsl:text>
        <html>
            <head>
                <meta charset="utf-8"/>

                <title>
                    <xsl:value-of select="page/title"/>
                </title>

                <meta name="robots" content="index, follow"/>
                <meta name="author" content="sidefyn GmbH"/>
                <meta name="description">
                    <xsl:attribute name="content">
                        <xsl:value-of select="page/description"/>
                    </xsl:attribute>
                </meta>
                <meta name="keywords">
                    <xsl:attribute name="content">
                        <xsl:value-of select="page/keywords"/>
                    </xsl:attribute>
                </meta>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, user-scalable=no"/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="theme-color" content="#294053"/>

                <!-- Open Graph -->
                <meta property="og:title" content="sidefyn GmbH"/>
                <meta property="og:type" content="company"/>
                <meta property="og:url" content="http://www.sidefyn.ch/"/>
                <meta property="og:image"
                      content="http://www.sidefyn.ch/public/dist/img/logo/sidefyn.png"/>

                <link rel="icon" type="image/png" href="/public/dist/img/icon/favicon.png"/>
                <link rel="publisher" href="https://plus.google.com/115010452072990930497"/>
                <link rel="stylesheet" type="text/css" href="/public/dist/css/main.css"/>
                <link rel="stylesheet" type="text/css"
                      href="http://fonts.googleapis.com/css?family=Marcellus+SC|Oxygen:400,700"/>
                <link rel="shortlink" href="http://www.sidefyn.ch"/>
                <link rel="canonical" href="http://+www.sidefyn.ch"/>

            </head>

            <body>
                <div class="container">
                    <xsl:apply-templates select="page/navigation"/>
                    <xsl:apply-templates select="page/rows"/>
                    <xsl:call-template name="footer"/>
                </div>

                <xsl:apply-templates select="page/subpages"/>
                <xsl:call-template name="reference"/>

                <script type="text/javascript">
                    <xsl:attribute name="src">
                        <xsl:text>//maps.googleapis.com/maps/api/js?key=AIzaSyBvv6FC_VQ7Pf_7d3sRnxoZ4oyVRN2CzqQ&amp;sensor=false</xsl:text>
                    </xsl:attribute>
                </script>
                <script type="text/javascript">
                    <xsl:attribute name="src">
                        <xsl:text>//apis.google.com/js/platform.js?publisherid=115010452072990930497</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="async"/>
                    <xsl:attribute name="defer"/>
                </script>
                <script src="/public/dist/js/main.min.js"></script>
                <script>
                    window.scrollReveal = new scrollReveal();
                </script>
                <script>
					<xsl:text xml:space="preserve">
					(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new
					Date();a=s.createElement(o),
					m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
					})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
					ga('create', '</xsl:text>
                    <xsl:value-of select="page/config/tracking-id"/>
					<xsl:text xml:space="preserve">', 'auto');
					ga('send', 'pageview');
					</xsl:text>
                </script>
            </body>
        </html>

        <xsl:comment>
            <xsl:text>Build date: </xsl:text>
            <xsl:value-of select="$build-date"/>
        </xsl:comment>
    </xsl:template>

    <xsl:template match="page/navigation">
        <header class="header">
            <div class="content">
                <a href="/" class="banner-logo">
                    <img src="/public/dist/img/logo/sidefyn.png" alt="sidefyn"/>
                </a>

                <nav class="nav">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#sidefyn-navbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <ul id="sidefyn-navbar" class="collapse">
                        <xsl:for-each select="main/item">
                            <li>
                                <xsl:if test="string-length(@style) > 0">
                                    <xsl:attribute name="class">
                                        <xsl:value-of select="@style"/>
                                    </xsl:attribute>
                                </xsl:if>
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="@href"/>
                                    </xsl:attribute>
                                    <xsl:value-of select="."/>
                                </a>
                            </li>
                        </xsl:for-each>
                        <li class="divider visible-sm"></li>
                        <xsl:for-each select="footer/item">
                            <li class="visible-sm">
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="@href"/>
                                    </xsl:attribute>

                                    <xsl:value-of select="."/>
                                </a>
                            </li>
                        </xsl:for-each>
                        <li class="divider visible-sm"></li>
                        <xsl:for-each select="languages/item">
                            <li class="visible-sm">
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="@href"/>
                                    </xsl:attribute>
                                    <xsl:value-of select="."/>
                                </a>
                            </li>
                        </xsl:for-each>
                    </ul>
                </nav>
            </div>
        </header>
    </xsl:template>

    <xsl:template match="page/rows">
        <xsl:for-each select="row">
            <div>
                <xsl:attribute name="id">
                    <xsl:value-of select="@id"/>
                </xsl:attribute>
                <xsl:attribute name="class">
                    <xsl:text>row </xsl:text>
                    <xsl:value-of select="@style"/>
                </xsl:attribute>
                <xsl:if test="string-length(@form) > 0">
                    <form>
                        <xsl:attribute name="id">
                            <xsl:value-of select="@form"/>
                        </xsl:attribute>
                        <div class="content">
                            <xsl:apply-templates/>
                        </div>
                    </form>
                </xsl:if>
                <xsl:if test="string-length(@form) = 0">
                    <div class="content">
                        <xsl:apply-templates/>
                    </div>
                </xsl:if>
            </div>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="textblock">
        <xsl:if test="string-length(@magic) > 0">
            <xsl:attribute name="data-sr">
                <xsl:value-of select="@magic"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:choose>
            <xsl:when test="@type = 'title'">
                <h1 class="row-title">
                    <xsl:apply-templates select="node()"
                                         mode="copy-no-namespaces"/>
                </h1>
            </xsl:when>
            <xsl:when test="@type = 'headline'">
                <div>
                    <xsl:attribute name="class">
                        <xsl:text>row-headline </xsl:text>
                        <xsl:if test="string-length(@style) > 0">
                            <xsl:value-of select="@style"/>
                        </xsl:if>
                    </xsl:attribute>
                    <h2>
                        <xsl:apply-templates select="node()"
                                             mode="copy-no-namespaces"/>
                    </h2>
                </div>
            </xsl:when>
            <xsl:when test="@type = 'subtitle'">
                <h3>
                    <xsl:if test="string-length(@style) > 0">
                        <xsl:attribute name="class">
                            <xsl:value-of select="@style"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="node()"
                                         mode="copy-no-namespaces"/>
                </h3>
            </xsl:when>
            <xsl:when test="@type = 'paragraph'">
                <p>
                    <xsl:if test="string-length(@style) > 0">
                        <xsl:attribute name="class">
                            <xsl:value-of select="@style"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="string-length(@for) > 0">
                        <xsl:attribute name="for">
                            <xsl:value-of select="@for"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="node()"
                                         mode="copy-no-namespaces"/>
                </p>
            </xsl:when>
            <xsl:when test="@type = 'input'">
                <input>
                    <xsl:if test="string-length(@input-type) > 0">
                        <xsl:attribute name="type">
                            <xsl:value-of select="@input-type"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:attribute name="id">
                        <xsl:value-of select="@id"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="@name"/>
                    </xsl:attribute>
                    <xsl:if test="string-length(@disabled) > 0">
                        <xsl:attribute name="disabled">
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="string-length(@style) > 0">
                        <xsl:attribute name="class">
                            <xsl:value-of select="@style"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="node()"
                                         mode="copy-no-namespaces"/>
                </input>
            </xsl:when>
            <xsl:when test="@type = 'textarea'">
                <textarea>
                    <xsl:if test="string-length(@style) > 0">
                        <xsl:attribute name="class">
                            <xsl:value-of select="@style"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:attribute name="id">
                        <xsl:value-of select="@id"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="@name"/>
                    </xsl:attribute>
                    <xsl:if test="string-length(@disabled) > 0">
                        <xsl:attribute name="disabled">
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="node()"
                                         mode="copy-no-namespaces"/>
                </textarea>
            </xsl:when>
            <xsl:when test="@type = 'addresses'">
                <xsl:for-each select="address">
                    <address class="address">
                        <xsl:apply-templates select="node()"
                                             mode="copy-no-namespaces"/>
                    </address>
                </xsl:for-each>
            </xsl:when>
            <xsl:when test="@type = 'address'">

                <address class="address">
                    <xsl:apply-templates select="node()"
                                         mode="copy-no-namespaces"/>
                </address>

            </xsl:when>
            <xsl:when test="@type = 'quote'">
                <blockquote>
                    <xsl:if test="string-length(@style) > 0">
                        <xsl:attribute name="class">
                            <xsl:value-of select="@style"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="node()"
                                         mode="copy-no-namespaces"/>
                </blockquote>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="a">
        <a href="{@href}" title="{@title}" onclick="window.open(this.href); return false;">
            <xsl:apply-templates/>
        </a>
    </xsl:template>

    <xsl:template match="table">
        <table>
            <xsl:apply-templates select="*" mode="copy-no-namespaces"/>
        </table>
    </xsl:template>

    <xsl:template match="div">
        <div>
            <xsl:if test="string-length(@class) > 0">
                <xsl:attribute name="class">
                    <xsl:value-of select="@class"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="*" mode="copy-no-namespaces"/>
        </div>
    </xsl:template>

    <xsl:template match="button">
        <div>
            <xsl:if test="string-length(@class) > 0">
                <xsl:attribute name="class">
                    <xsl:value-of select="@class"/>
                </xsl:attribute>
            </xsl:if>
            <p class="text-center">
                <xsl:if test="string-length(@style) > 0">
                    <xsl:attribute name="class">
                        <xsl:value-of select="@style"/>
                    </xsl:attribute>
                </xsl:if>
                <a class="btn">
                    <xsl:attribute name="href">
                        <xsl:value-of select="@id"/>
                    </xsl:attribute>
                    <xsl:if test="@newwindow = 'true'">
                        <xsl:attribute name="onclick">
                            <xsl:text>window.open(this.href); return false;</xsl:text>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="."/>
                </a>
            </p>
        </div>
    </xsl:template>

    <xsl:template match="img">
        <img>
            <xsl:attribute name="src">
                <xsl:value-of select="@src"/>
            </xsl:attribute>
            <xsl:attribute name="alt">
                <xsl:value-of select="@alt"/>
            </xsl:attribute>
            <xsl:if test="string-length(@id) > 0">
                <xsl:attribute name="id">
                    <xsl:value-of select="@id"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="string-length(@class) > 0">
                <xsl:attribute name="class">
                    <xsl:value-of select="@class"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="string-length(@width) > 0">
                <xsl:attribute name="width">
                    <xsl:value-of select="@width"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="string-length(@height) > 0">
                <xsl:attribute name="height">
                    <xsl:value-of select="@height"/>
                </xsl:attribute>
            </xsl:if>
        </img>
    </xsl:template>

    <xsl:template match="svg">
        <xsl:apply-templates select="." mode="copy-no-namespaces"/>
    </xsl:template>

    <xsl:template match="ul">
        <ul>
            <xsl:apply-templates select="node()" mode="copy-no-namespaces"/>
        </ul>
    </xsl:template>

    <xsl:template match="br">
        <br/>
    </xsl:template>

    <xsl:template match="scroll-down">
        <a>
            <xsl:attribute name="href">
                <xsl:value-of select="concat('#', @id)"/>
            </xsl:attribute>

            <span class="arrow arrow-down arrow-bounce"></span>
        </a>
    </xsl:template>

    <xsl:template match="scroll-up">
        <a>
            <xsl:attribute name="href">
                <xsl:value-of select="concat('#', @id)"/>
            </xsl:attribute>

            <span class="arrow arrow-up arrow-bounce"></span>
        </a>
    </xsl:template>

    <xsl:template match="grid">
        <div>
            <xsl:attribute name="class">
                <xsl:text>grid</xsl:text>
                <xsl:if test="string-length(@style) > 0">
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="@style"/>
                </xsl:if>
            </xsl:attribute>
            <xsl:for-each select="col">
                <div class="col">
                    <xsl:attribute name="class">
                        <xsl:text>col</xsl:text>
                        <xsl:if test="string-length(@width-xs) > 0">
                            <xsl:text> col-xs-</xsl:text>
                            <xsl:value-of select="@width-xs"/>
                        </xsl:if>
                        <xsl:if test="string-length(@width-sm) > 0">
                            <xsl:text> col-sm-</xsl:text>
                            <xsl:value-of select="@width-sm"/>
                        </xsl:if>
                        <xsl:if test="string-length(@width-md) > 0">
                            <xsl:text> col-md-</xsl:text>
                            <xsl:value-of select="@width-md"/>
                        </xsl:if>
                        <xsl:if test="string-length(@width-lg) > 0">
                            <xsl:text> col-lg-</xsl:text>
                            <xsl:value-of select="@width-lg"/>
                        </xsl:if>
                        <xsl:if test="string-length(@height) > 0">
                            <xsl:text> height-</xsl:text>
                            <xsl:value-of select="@height"/>
                        </xsl:if>
                        <xsl:if test="string-length(@style) > 0">
                            <xsl:text> </xsl:text>
                            <xsl:value-of select="@style"/>
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:if test="string-length(@id) > 0">
                        <xsl:attribute name="id">
                            <xsl:value-of select="@id"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="string-length(@magic) > 0">
                        <xsl:attribute name="data-sr">
                            <xsl:value-of select="@magic"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates/>
                </div>
            </xsl:for-each>
        </div>
    </xsl:template>

    <xsl:template match="tabs">
        <div class="tab-container">
            <xsl:for-each select="tab">
                <div class="tab">
                    <xsl:attribute name="id">
                        <xsl:value-of select="@id"/>
                    </xsl:attribute>

                    <xsl:apply-templates/>
                </div>
            </xsl:for-each>
        </div>
    </xsl:template>

    <xsl:template name="reference">
        <xsl:for-each select="//reference">
            <div class="reference hide" data-id="{@id}">
                <div class="text-center">
                    <xsl:apply-templates/>
                </div>
            </div>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="map">
        <div id="map" class="map"></div>
    </xsl:template>

    <xsl:template name="footer">
        <footer class="row footer">
            <div class="content">
                <xsl:apply-templates select="page/addresses" mode="copy-no-namespaces"/>

                <ul class="footer-language hidden-sm">
                    <xsl:for-each select="page/navigation/languages/item">
                        <li>
                            <a>
                                <xsl:attribute name="href">
                                    <xsl:value-of select="@href"/>
                                </xsl:attribute>
                                <xsl:value-of select="."/>
                            </a>
                        </li>
                    </xsl:for-each>
                </ul>

                <ul class="footer-nav hidden-sm">
                    <xsl:for-each select="page/navigation/footer/item">
                        <li>
                            <a>
                                <xsl:attribute name="href">
                                    <xsl:value-of select="@href"/>
                                </xsl:attribute>
                                <xsl:value-of select="."/>
                            </a>
                        </li>
                    </xsl:for-each>
                </ul>
            </div>
        </footer>
    </xsl:template>

    <xsl:template match="comment()| processing-instruction()"
                  mode="copy-no-namespaces">
        <xsl:copy/>
    </xsl:template>

    <xsl:template match="*" mode="copy-no-namespaces">
        <xsl:element name="{local-name()}" namespace="{namespace-uri()}">
            <xsl:copy-of select="@*[not(name() = 'xml:base')]"/>
            <xsl:apply-templates select="node()" mode="copy-no-namespaces"/>
        </xsl:element>
    </xsl:template>


</xsl:stylesheet>