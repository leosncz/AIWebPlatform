/*
	Main function for inference & training
*/

function trainSingleLayerPerceptron(dataset, lr, nbEpoch, textBlock)
{	
	m = dataset.length - 1;
	
	featuresName = dataset[0];

	dataset = dataset.slice(1);
		
	// Get all needed matrix
	weights = math.random([dataset[0].length-1]);
	b = math.random();
	X = [];
	y = [];
	for (var i = 0; i < dataset.length; i++) {
		X.push(dataset[i].slice(0,dataset[i].length-1));
		y.push(dataset[i][dataset[i].length-1])
	}
	X = math.matrix(X);
	y = math.matrix(y);
	
	// Training
	for (var i = 0;i<nbEpoch;i++)
	{
		Z = math.add(math.multiply(X,weights),b);
		A = math.add(1,math.exp(math.unaryMinus(Z)));
		// We have to inverse each member of A
		A = math.map(A, function(value) {
		  return 1/value
		})

		// Compute cost
		cost = math.multiply(-1/m,math.sum(math.add(math.multiply(y,math.log(A)),math.multiply(math.subtract(1,y),math.log(math.subtract(1,A))))));
		
		// Update weights
		weights = math.subtract(weights,math.multiply(lr,math.multiply(math.divide(math.transpose(X),m),math.subtract(A,y))));
		b = math.subtract(b,math.multiply(lr,math.multiply(1/m,math.sum(math.subtract(A,y)))));
		
		textBlock.innerHTML += "</br> Epoch " + i + " : cost=" + cost;
		
	}
	
	// Display final weights as CSV for futur import feature for inference
	textBlock.innerHTML += "</br></br> Training over ! Final parameters are : </br><b>" + featuresName + "</br>" + weights._data + "</b>";
}