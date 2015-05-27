
var index = lunr(function () {
    this.field('body');
    this.ref('url');
});

var documentTitles = {};



documentTitles["readme.html#aurelia-markdown"] = "Aurelia Markdown";
index.add({
    url: "readme.html#aurelia-markdown",
    title: "Aurelia Markdown",
    body: "# Aurelia Markdown  A custom element that renders markdown and highlights code blocks with prism.  "
});

documentTitles["readme.html#installation"] = "Installation";
index.add({
    url: "readme.html#installation",
    title: "Installation",
    body: "## Installation      jspm install github:gooy/aurelia-markdown  "
});

documentTitles["readme.html#usage"] = "Usage";
index.add({
    url: "readme.html#usage",
    title: "Usage",
    body: "## Usage     Globalize the resource      aurelia.globalizeResources(\&quot;gooy/aurelia-markdown\&quot;);      OR require it in the view where you need it      &lt;require from=\&quot;gooy/aurelia-markdown\&quot;&gt;&lt;/require&gt;;  Use it in your template      &lt;markdown&gt;       # Header              This is rendered **markdown**.     &lt;/markdown&gt; "
});



documentTitles["documentation.html#documentation"] = "Documentation";
index.add({
    url: "documentation.html#documentation",
    title: "Documentation",
    body: "# Documentation  This documentation website is auto generated by [beautiful-docs](http://beautifuldocs.com/).  The content is generated from markdown files located in the `doc` directory.  "
});

documentTitles["documentation.html#gulp-tasks"] = "Gulp tasks";
index.add({
    url: "documentation.html#gulp-tasks",
    title: "Gulp tasks",
    body: "### Gulp tasks  Generate and serve the documentation       gulp serve-docs      run `gulp docs` to generate the documentation without starting a server.      The documentation will be available at [http://localhost:9002](http://localhost:9002)   Push documentation to `gh-pages`      gulp deploy-docs      This will create a commit on the gh-pages branch and push it to the online repository. "
});



documentTitles["changelog.html#changelog"] = "Changelog";
index.add({
    url: "changelog.html#changelog",
    title: "Changelog",
    body: "# Changelog &lt;a name\&quot;0.0.1\&quot;&gt;&lt;/a&gt; "
});

documentTitles["changelog.html#001-2015-05-24"] = "0.0.1 (2015-05-24)";
index.add({
    url: "changelog.html#001-2015-05-24",
    title: "0.0.1 (2015-05-24)",
    body: "### 0.0.1 (2015-05-24)  "
});


