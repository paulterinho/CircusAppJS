var circusapp = circusapp || {}; // check to see if the module exists already, if not create one.

/**
	@module circusapp.domain
*/
circusapp.domain = {

	// For more info on documentation: http://stackoverflow.com/questions/13876554/documentation-of-classes-and-modules-in-yuidocs

	mediaPath : "media/", // what folder the image resources exist at.
	imgBigPostfix :"_big.png", //This is going to be the string that get's appended to the end of the image for large images.
	imgSmallPostfix : "_sm.png", //This is going to be the string that get's appended to the end of the image for small images.


	/**
		Don't use this class directly, instead, be sure to subclass.

		<p>Animal is the super class that contains images that will be swaped (thumbnail and regular image)</p>

		<p>Note, that this object will insert a reference inside it'self into it;s two associated images. </p>

		@class Animal
		@constructor
		@param {String} [a_name] Is the name of the animal
		@param {String} [a_sound] Is the string representation of what noise the animal makes.
		@param {String} [a_imageBaseName] Is the part of the file name that will be used. For 
				example, if 'bear' is inputted, then this class will generate a 'bear_sm.png', or a 'bear_lg.png'.
		@param {String} [a_type] The class type, so the type can be detected during runtime because the Javascript "instanceOf" operator doesn't work very well.
	*/
	Animal: function(a_name, a_sound, a_imageBaseName, a_type)
	{
		var name = a_name; // The name of the animal
		var sound = a_sound; //The sound that the animal makes.
		var imageBaseName = a_imageBaseName;
		var type = a_type;
		
		var imgSmall = circusapp.domain.mediaPath + imageBaseName + circusapp.domain.imgSmallPostfix;

		var imgBig = circusapp.domain.mediaPath + imageBaseName + circusapp.domain.imgBigPostfix;

		this.makesSound = function(){
			return sound;
		};

		this.getName = function(){
			return name;
		};

		this.getImgBig = function()
		{
			return imgBig;
		};

		this.getImgSmall = function()
		{
			return imgSmall;
		};

		/**
			Returns the type of animal this class is because the Javascript 
			instanceOf operator won't distinguish which type. 

			@method getType
			@return {Object} The function constructor of the animal (i.e. circusapp.domain.Bear)
		*/
		this.getType = function()
		{
			return type;
		};
	},

	/**
		The bear class has a bear picture, and can hibernate. 

		@class Bear

		@constructor
		@param {String} [name] Is the name of the animal
	*/
	Bear: function(name)
	{
		var thisBear = Object.create(new circusapp.domain.Animal(name, "rarrrr", "bear", circusapp.domain.Bear));
		
		/**
			Get the bear to sleep

			@method hibernate
			@return {String} The name plus the string " sleeps for the winter"
		*/
		thisBear.hibernate = function(){
			return "'" + name + "' sleeps for the winter";
		};

		return thisBear;
	},

	/**
		The Monkey class has a monkey picture, and can "eat bananas". 
		
		@class Monkey

		@constructor
		@param {String} [name] Is the name of the animal
	*/
	Monkey: function(name)
	{
		var thisMonkey = Object.create(new circusapp.domain.Animal(name, "ohhh haaa", "monkey", circusapp.domain.Monkey));
		
		/**
			Get the monkey to eat a banana

			@method eatSnacks
			@return {String} The name plus the string " eats some snacks"
		*/
		thisMonkey.eatBanana = function(){
			return "'" + name + "' eats a banana";
		};

		return thisMonkey;
	},

	/**
		The Pig class has a pig picture, and can "eat snacks". 
		
		@class Pig

		@constructor
		@param {String} [name] Is the name of the animal
	*/
	Pig: function(name)
	{
		var thisPig = Object.create(new circusapp.domain.Animal(name, "oink", "pig", circusapp.domain.Pig));
		
		/**
			Get the animal to eat some snacks

			@method eatSnacks
			@return {String} The name plus the string " eats some snacks"
		*/
		thisPig.eatSnacks = function(){
			return "'" + name + "' eats some snacks";
		};

		return thisPig;
	},
};