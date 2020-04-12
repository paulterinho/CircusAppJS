var circusapp = circusapp || {}; // check to see if the module exists already, if not create one.

/**
	This is the business logic for keeping track of what animals are created. 

	@module circusapp.app
	@class GUI
*/
circusapp.app = {

	/**
		Private property that contains the current list of animals.

		@property _animals
	*/
	_animals: [],

	/**
		This method will prompt the user for which animal they wish to create, and then add it to the collection. 
		
		@method addAnimal
	*/
	addAnimal : function()
	{
		var animal = "";

		while ((animal != "bear") && (animal != "pig") && (animal != "monkey"))
		{
			animal = prompt("Choose animal (bear, pig or monkey): ");
		}
		
		var name = prompt("Animal name: ");
		var newAnimal = null;
		
		switch(animal)
		{
			case "bear":
				newAnimal = new circusapp.domain.Bear(name);
				break;
			case "pig":
				newAnimal = new circusapp.domain.Pig(name);
				break;
			case "monkey":
				newAnimal = new circusapp.domain.Monkey(name);
				break;
		}
		
		//check to see if it exists
		if(newAnimal)
		{
			// add it to the array
			circusapp.app._animals.push( newAnimal );

			// get a hold of the target. 
			var aList = document.getElementById("animalList");

			// add event listeners to it's images.
			var imgRef = new Image();
			imgRef.src = newAnimal.getImgSmall();

			// add a reference to this animal so we can handle the roll in and roll out behavior.
			imgRef.animal = newAnimal;

			// add handlers that will swap the big and small images. 
			imgRef.addEventListener("mouseover", circusapp.app.imageToggleSrc, false);
			imgRef.addEventListener("mouseout", circusapp.app.imageToggleSrc, false);


			// create a div to put inside
			var theDiv = document.createElement("li");
			var textNode = document.createTextNode(newAnimal.getName());
			theDiv.appendChild(imgRef);
			theDiv.appendChild(textNode);
			aList.appendChild(theDiv);

			circusapp.app._log( "* ANIMAL ADDED: Whom has the name of '" + newAnimal.getName() + "'");
		}
	},

	/**
		This will get called when the image is rolled over, and set the other image (if it is a thumbnail, it will swap it for a big pic.)  

		@method imageToggleSrc
	*/
	imageToggleSrc: function(e)
	{
		

		// note that this function utilizes the reference that the Animal base 
		// class will insert into the image to reference itself. 
		var img = e.target;

		if(img.animal)
		{
			var referencedAnimal = img.animal;
			var newImgSrc = null;

			if(img.src.indexOf(referencedAnimal.getImgSmall()) != -1)
			{
				newImgSrc = referencedAnimal.getImgBig();
				circusapp.app._log("* MOUSEOVER, " + e.currentTarget);
			}else{
				newImgSrc = referencedAnimal.getImgSmall();
				circusapp.app._log("* MOUSEOUT, " + e.currentTarget);
			}
			
			img.src = newImgSrc;

		}else{
			circusapp.app._log("* No 'animal' property found on the source image. Are you sure you are instantiating an Animal?");
		}
		

	},

	/**
		This is used to return the sound the song that the _animals make. It will 

		@method groupSing
	*/
	groupSing : function()
	{
		var msgToLog = "* GROUP SONG: ";
		if(circusapp.app._animals.length > 0)
		{
			for (var i=0; i<circusapp.app._animals.length; i++)
			{
				msgToLog += "'" + circusapp.app._animals[i].getName() + "' goes " + circusapp.app._animals[i].makesSound() + "! ";
			}

			circusapp.app._log(msgToLog);
		}
		
		
	},

	/**
		This function is to make sure the students know how to use a switch statement. 

		@method groupTricks
	*/
	groupTricks : function()
	{
		var msgToLog = "* GROUP TRICKS: ";
		if(circusapp.app._animals.length > 0)
		{
			for (var i=0; i<circusapp.app._animals.length; i++)
			{
				switch(circusapp.app._animals[i].getType())
				{
					case circusapp.domain.Bear:
						msgToLog += circusapp.app._animals[i].hibernate();
						break;
					case circusapp.domain.Pig:
						msgToLog += circusapp.app._animals[i].eatSnacks();
						break;
					case circusapp.domain.Monkey:
						msgToLog += circusapp.app._animals[i].eatBanana();
						break;
					default:
						break;
				}
				msgToLog += ", ";

			}

			circusapp.app._log(msgToLog);
		}
		
	},

	/**
		Private utility method for writing to an HTML element with an id of "log". (I know, it's crappy that it's hard-coded :-P)

		@method log
	*/
	_log : function(msg)
	{
		var ul = document.getElementById("log");

		var theLi = document.createElement("li");
		var textNode = document.createTextNode(msg);
		theLi.appendChild(textNode);
		ul.appendChild(theLi);
	},
};