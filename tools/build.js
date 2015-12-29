{
    appDir: '../static',
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
	 "jquery": "http://code.jquery.com/jquery-1.10.1.min",
	 "jqueryui": "http://code.jquery.com/ui/1.10.3/jquery-ui.min"
    },
    dir: '../static/www-built',
    modules: [
	
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: '../common',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: ['jquery',
                      'app/Basegrid',
		      'app/i18n'
                      
            ],
	    excludeShallow: ['lang']
        },
	
        //Now set up a build layer for each page, but exclude
        //the common one. "exclude" will exclude nested
        //the nested, built dependencies from "common". Any
        //"exclude" that includes built modules should be
        //listed before the build layer that wants to exclude it.
        //"include" the appropriate "app/main*" module since by default
        //it will not get added to the build since it is loaded by a nested
        //require in the page*.js files.
        {
            //module names are relative to baseUrl/paths config
	    name: '../page0',
            excludeShallow: ['lang']
	},
	{
            name: '../page1',
            include: ['app/main1'],
            exclude: ['../common'],
	    excludeShallow: ['lang']
        },

        {
            //module names are relative to baseUrl
            name: '../page2',
            include: ['app/main2'],
            exclude: ['../common'],
	    excludeShallow: ['lang']
        },
	 {
            //module names are relative to baseUrl
            name: '../page3',
            include: ['app/main3'],
            exclude: ['../common'],
	    excludeShallow: ['lang']
        }
	,{
            //module names are relative to baseUrl
            name: '../page4',
            include: ['app/main4'],
            exclude: ['../common'],
	    excludeShallow: ['lang']
        }

    ],
optimize: "closure",
closure: {
CompilerOptions: {},
CompilationLevel: 'SIMPLE_OPTIMIZATIONS',
loggingLevel: 'WARNING'
}
}
