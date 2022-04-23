/*
	MAIN JAVASCRIPT ENTRY POINT
*/

// Global dataset, ugly but Javascript is ugly.
globalDataset = [];

// Configure file importation handler (Only CSV for now)
document.getElementById('inputFile').addEventListener('change', function() {var fr=new FileReader();
	fr.onload=function(){
		// Show loading text
		loadingDataset = document.getElementById("loadingDataset");
		loadingDataset.innerHTML = "Loading your CSV file ..."
		globalDataset = csvToArray(fr.result);
		loadingDataset.innerHTML = ""
		goAlgorithmSelection(); // Switch to next menu once dataset is loaded
	}
	fr.readAsText(this.files[0]);});

// Go home
goHome();

function goHome()
{
	algorithmPanel = document.getElementById("algorithmPanel");
	algorithmSelection = document.getElementById("algorithmSelection");
	datasetSelection = document.getElementById("datasetSelection");
	
	// Only show datasetSelection (home)
	datasetSelection.style.display = "block";
	algorithmSelection.style.display = "none";
	algorithmPanel.style.display = "none";
	
}

function goAlgorithmSelection()
{	
	algorithmPanel = document.getElementById("algorithmPanel");
	algorithmSelection = document.getElementById("algorithmSelection");
	datasetSelection = document.getElementById("datasetSelection");
	
	// Only show algorithmSelection
	algorithmPanel.style.display = "none";
	algorithmSelection.style.display = "block";
	datasetSelection.style.display = "none";
	
	algorithmSelectionIntro = document.getElementById("algorithmSelectionIntro");
	algorithmSelectionIntro.innerHTML = "Dataset contains " + globalDataset.length + " entries.";
	
}

function goAlgorithmPanel(algorithmName)
{
	algorithmPanel = document.getElementById("algorithmPanel");
	algorithmSelection = document.getElementById("algorithmSelection");
	datasetSelection = document.getElementById("datasetSelection");
	
	// Only show algorithmPanel
	algorithmPanel.style.display = "block";
	algorithmSelection.style.display = "none";
	datasetSelection.style.display = "none";
	
	// Configure panel
	panel = document.getElementById("algorithmPanelBody");
	
	panel.innerHTML = "<h5 class=\"card-title\">" + algorithmName + "</h5>";
	
	if(algorithmName == "singleLayerPerceptron")
	{
		renderSingleLayerPerceptronInterface(panel,"algorithmPanelBody");
	}
	else if(algorithmName == "linearRegression")
	{
		alert('Linear regression not available yet :(');
	}
}

function renderSingleLayerPerceptronInterface(textBlock,outputID)
{
	textBlock.innerHTML += "<p>Number of epochs :</p><input type=\"number\" id=\"nbEpochs\"/></br><p>Learning rate :</p><input type=\"number\" id=\"learningRate\"/></br><button onclick=\"trainSingleLayerPerceptron(globalDataset, parseFloat(document.getElementById('learningRate').value), parseInt(document.getElementById('nbEpochs').value), document.getElementById('" + outputID + "'))\">Start training (Batch Gradient Descent)</button>"
}

// Converts csv string to csv array
const csvToArray = (data, delimiter = ',', omitFirstRow = false) => data.slice(omitFirstRow ? data.indexOf('\n') + 1 : 0).split('\n').map(v => v.split(delimiter));