<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="subpages">
		<xsl:for-each select="subpage">
			<div class="subpage" id="{@id}">
				<xsl:if test="string-length(@next) > 0">
					<xsl:attribute name="data-next">
						<xsl:value-of select="@next" />
					</xsl:attribute>
				</xsl:if>
				<xsl:if test="string-length(@prev) > 0">
					<xsl:attribute name="data-prev">
						<xsl:value-of select="@prev" />
					</xsl:attribute>
				</xsl:if>

				<div class="subpage-wrapper">

					<xsl:variable name="prev">
						<xsl:value-of select="@prev" />
					</xsl:variable>
					<xsl:variable name="next">
						<xsl:value-of select="@next" />
					</xsl:variable>

					<xsl:choose>
						<xsl:when test="//subpage[@id = $prev]/@id">
							<xsl:call-template name="subpage-ghost-reverse">
								<xsl:with-param name="id">
									<xsl:value-of select="$prev" />
								</xsl:with-param>
								<xsl:with-param name="current-id">
									<xsl:value-of select="@id" />
								</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:otherwise>
							<div class="subpage-ghost hidden-sm"></div>
						</xsl:otherwise>
					</xsl:choose>

					<div class="content">

						<div class="subpage-controls">
							<xsl:if test="string-length(@next) > 0 or string-length(@prev) > 0">
								<ul class="subpage-navigation">
									<xsl:call-template name="subpage-navigation-reverse">
										<xsl:with-param name="id">
											<xsl:value-of select="@prev" />
										</xsl:with-param>
										<xsl:with-param name="current-id">
											<xsl:value-of select="@id" />
										</xsl:with-param>
									</xsl:call-template>
								</ul>
							</xsl:if>

							<xsl:call-template name="close-button" />

							<xsl:if test="string-length(@prev) > 0">
								<div class="subpage-prev hidden-sm">
									<div class="subpage-prev-button">
										<a href="#{@prev}">
											<span class="arrow arrow-left" />
										</a>
									</div>
								</div>
							</xsl:if>

							<xsl:if test="string-length(@next) > 0">
								<div class="subpage-next hidden-sm">
									<div class="subpage-next-button">
										<a href="#{@next}">
											<span class="arrow arrow-right" />
										</a>
									</div>
								</div>
							</xsl:if>
						</div>
						<xsl:apply-templates />
					</div>

					<xsl:choose>
						<xsl:when test="//subpage[@id = $next]/@id">
							<xsl:call-template name="subpage-ghost-forward">
								<xsl:with-param name="id">
									<xsl:value-of select="$next" />
								</xsl:with-param>
								<xsl:with-param name="current-id">
									<xsl:value-of select="@id" />
								</xsl:with-param>
								<xsl:with-param name="position">
									<xsl:value-of select="'right'" />
								</xsl:with-param>
							</xsl:call-template>
						</xsl:when>
						<xsl:otherwise>
							<div class="subpage-ghost hidden-sm"></div>
						</xsl:otherwise>
					</xsl:choose>

				</div>
			</div>
		</xsl:for-each>
	</xsl:template>

	<xsl:template name="subpage-ghost-reverse">
		<xsl:param name="id" />
		<xsl:param name="current-id" />

		<xsl:variable name="item-id">
			<xsl:choose>
				<xsl:when test="string-length($id) &lt;= 0">
					<xsl:value-of select="$current-id" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$id" />
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:choose>
			<xsl:when test="//subpage[@id = $item-id]/@prev">
				<xsl:call-template name="subpage-ghost-reverse">
					<xsl:with-param name="id">
						<xsl:value-of select="//subpage[@id = $item-id]/@prev" />
					</xsl:with-param>
					<xsl:with-param name="current-id">
						<xsl:value-of select="$current-id" />
					</xsl:with-param>
				</xsl:call-template>
			</xsl:when>

			<xsl:otherwise>
				<xsl:call-template name="subpage-ghost-forward">
					<xsl:with-param name="id">
						<xsl:value-of select="$item-id" />
					</xsl:with-param>
					<xsl:with-param name="current-id">
						<xsl:value-of select="$current-id" />
					</xsl:with-param>
					<xsl:with-param name="position">
						<xsl:value-of select="'left'" />
					</xsl:with-param>
				</xsl:call-template>
			</xsl:otherwise>

		</xsl:choose>

	</xsl:template>

	<xsl:template name="subpage-ghost-forward">
		<xsl:param name="id" />
		<xsl:param name="current-id" />
		<xsl:param name="position" />

		<xsl:variable name="item-id">
			<xsl:choose>
				<xsl:when test="string-length($id) &lt;= 0">
					<xsl:value-of select="$current-id" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$id" />
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:if
			test="//subpage[@id = $id]/@id and //subpage[@id = $id]/@id != $current-id">
			<div class="col subpage-ghost hidden-sm clickable-column"
				data-position="{$position}" data-id="{//subpage[@id = $id]/@id}" title="{//subpage[@id = $id]/@title}" />

			<xsl:call-template name="subpage-ghost-forward">
				<xsl:with-param name="id">
					<xsl:value-of select="//subpage[@id = $id]/@next" />
				</xsl:with-param>
				<xsl:with-param name="current-id">
					<xsl:value-of select="$current-id" />
				</xsl:with-param>
				<xsl:with-param name="position">
					<xsl:value-of select="$position" />
				</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<xsl:template name="subpage-navigation-reverse">
		<xsl:param name="id" />
		<xsl:param name="current-id" />

		<xsl:variable name="item-id">
			<xsl:choose>
				<xsl:when test="string-length($id) &lt;= 0">
					<xsl:value-of select="$current-id" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="$id" />
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:choose>

			<xsl:when test="//subpage[@id = $item-id]/@prev">
				<xsl:call-template name="subpage-navigation-reverse">
					<xsl:with-param name="id">
						<xsl:value-of select="//subpage[@id = $item-id]/@prev" />
					</xsl:with-param>
					<xsl:with-param name="current-id">
						<xsl:value-of select="$current-id" />
					</xsl:with-param>
				</xsl:call-template>
			</xsl:when>

			<xsl:otherwise>
				<xsl:call-template name="subpage-navigation-forward">
					<xsl:with-param name="id">
						<xsl:value-of select="$item-id" />
					</xsl:with-param>
					<xsl:with-param name="current-id">
						<xsl:value-of select="$current-id" />
					</xsl:with-param>
				</xsl:call-template>
			</xsl:otherwise>

		</xsl:choose>
	</xsl:template>

	<xsl:template name="subpage-navigation-forward">
		<xsl:param name="id" />
		<xsl:param name="current-id" />

		<li>
			<a href="#{$id}" title="{//subpage[@id = $id]/@title}">
				<span class="icon-circle">
					<xsl:attribute name="class">
						<xsl:text>icon-circle</xsl:text>
						<xsl:if test="$id = $current-id">
							<xsl:text> active</xsl:text>
						</xsl:if>
					</xsl:attribute>
				</span>
			</a>
		</li>

		<xsl:if test="//subpage[@id = $id]/@next">
			<xsl:call-template name="subpage-navigation-forward">
				<xsl:with-param name="id">
					<xsl:value-of select="//subpage[@id = $id]/@next" />
				</xsl:with-param>
				<xsl:with-param name="current-id">
					<xsl:value-of select="$current-id" />
				</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<xsl:template name="close-button">
		<div class="btn-close">
			<p>
				<button>
					<span class="icon-diagonal-bar"></span>
					<span class="icon-diagonal-bar"></span>
				</button>
			</p>
		</div>
	</xsl:template>
</xsl:stylesheet>