import React, { useRef, useState } from 'react';
import {
	IonApp,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonRow,
	IonTitle,
	IonToolbar,
	IonAlert,
	IonCardContent,
	IonCard,
} from '@ionic/react';

import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControl from './components/InputControl';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
	const [calculatedBmi, setCalculatedBmi] = useState<number>();
	const [error, setError] = useState<string>();
	const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');

	const weightInputRef = useRef<HTMLIonInputElement>(null);
	const heightInputRef = useRef<HTMLIonInputElement>(null);

	const calculateBMI = () => {
		const enteredWeight = weightInputRef.current!.value;
		const enteredHeight = heightInputRef.current!.value;

		if (
			!enteredHeight ||
			!enteredWeight ||
			+enteredWeight <= 0 ||
			+enteredHeight <= 0
		) {
			setError(
				'Por favor ingrese un valor valido (no ingrese numeros negativos)'
			);
			return;
		}

		const weightConvertFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
		const heightConvertFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

		const weight = +enteredWeight / weightConvertFactor;
		const height = +enteredHeight / heightConvertFactor;

		const bmi = weight / (height * height);
		setCalculatedBmi(bmi);
	};

	const resetInputs = () => {
		weightInputRef.current!.value = '';
		heightInputRef.current!.value = '';
	};

	const clearError = () => {
		setError('');
	};

	const selectCalcUnitsHandler = (selectedValue: 'mkg' | 'ftlbs') => {
		setCalcUnits(selectedValue);
	};

	return (
		<React.Fragment>
			<IonAlert
				isOpen={!!error}
				message={error}
				buttons={[{ text: 'Okay', handler: clearError }]}
			/>
			<IonApp>
				<IonHeader>
					<IonToolbar color="dark">
						<IonTitle>BMI Calculator</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent className="ion-padding">
					<IonGrid>
						<IonRow>
							<IonCol
								size-sm="8"
								offset-sm="2"
								size-md="6"
								offset-md="3"
								className="ion-no-padding"
							>
								<IonCard className="ion-no-margin">
									<IonCardContent>
										<IonGrid className="ion-no-padding">
											<IonRow>
												<IonCol>
													<InputControl
														selectedValue={calcUnits}
														onSelectValue={selectCalcUnitsHandler}
													/>
												</IonCol>
											</IonRow>
											<IonRow>
												<IonCol>
													<IonItem>
														<IonLabel position="floating">
															Altura ({calcUnits === 'mkg' ? 'metros' : 'pies'})
														</IonLabel>
														<IonInput
															type="number"
															ref={heightInputRef}
														></IonInput>
													</IonItem>
												</IonCol>
											</IonRow>
											<IonRow>
												<IonCol>
													<IonItem>
														<IonLabel position="floating">
															Peso ({calcUnits === 'mkg' ? 'Kg' : 'lbs'})
														</IonLabel>
														<IonInput
															type="number"
															ref={weightInputRef}
														></IonInput>
													</IonItem>
												</IonCol>
											</IonRow>
											<BmiControls
												onCalculate={calculateBMI}
												onReset={resetInputs}
											/>
										</IonGrid>
									</IonCardContent>
								</IonCard>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								{calculatedBmi && <BmiResult result={calculatedBmi} />}
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonContent>
			</IonApp>
		</React.Fragment>
	);
};

export default App;
