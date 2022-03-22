class Progress {
    constructor(barSelector,circleSelector, valueSelector, animationSelector, hideSelector) {
        this._bar=document.querySelector(barSelector);
        this._circle=document.querySelector(circleSelector);
        this._radius= this._circle.r.baseVal.value;
        this._circleLength = 2*Math.PI*this._radius;
        this._valueInput = document.querySelector(valueSelector);
        this._animateBttn = document.querySelector(animationSelector);
        this._hideBttn=document.querySelector(hideSelector);
        this._animateBttnHandlerBinded=this._animateBttnHandler.bind(this);
        this._inputValueHandlerBinded = this._inputValueHandler.bind(this);
        this._hideBttnHandlerBinded = this._hideBttnHandler.bind(this);
    }

    setEventListeners () {
        this._animateBttn.addEventListener('click', this._animateBttnHandlerBinded);
        this._valueInput.addEventListener('input', this._inputValueHandlerBinded);
        this._hideBttn.addEventListener('click', this._hideBttnHandlerBinded)
    }

    _setProgress(percent) {
        const offset = this._circleLength - percent / 100 * this._circleLength;
        this._circle.style.strokeDasharray = `${this._circleLength} ${this._circleLength}`
        this._circle.style.strokeDashoffset = offset;
    }

    _inputValueHandler () {
        if (this._animateBttn.classList.contains("checkbox-input_active")) {
            this._animateBttn.classList.add("checkbox-input");
            this._animateBttn.classList.remove("checkbox-input_active");
        }
        if (this._hideBttn.classList.contains("checkbox-input_active")) {
            this._hideBttn.classList.remove("checkbox-input_active");
            this._hideBttn.classList.add("checkbox-input");
            this._bar.style.visibility='visible';
        }
        if(this._valueInput.value>100) {
            this._valueInput.value=0
        }
        if(this._valueInput.value<0) {
            this._valueInput.value=0;
        }
        this._setProgress(this._valueInput.value)
    }
    
    _animateBttnHandler () {
        const changeInputValue = ()=> {
            if(this._valueInput.value==100) {
                this._valueInput.value='0'
            }
            else {
                this._valueInput.value=`${Number(this._valueInput.value)+1}`
                this._setProgress(this._valueInput.value)
            }
        }
        if (this._animateBttn.classList.contains("checkbox-input_active")) {
            this._animateBttn.classList.add("checkbox-input");
            this._animateBttn.classList.remove("checkbox-input_active");
            clearInterval(this._interval);
        }
        else {
            if (this._hideBttn.classList.contains("checkbox-input_active")) {
                this._hideBttn.classList.remove("checkbox-input_active");
                this._hideBttn.classList.add("checkbox-input");
            }
            this._animateBttn.classList.remove("checkbox-input");
            this._animateBttn.classList.add("checkbox-input_active");
            this._interval=setInterval(changeInputValue,10);
            
        }
    }
    
    _hideBttnHandler () {
        if (this._hideBttn.classList.contains("checkbox-input_active")) {
            this._hideBttn.classList.remove("checkbox-input_active");
            this._hideBttn.classList.add("checkbox-input");
            this._bar.style.visibility='visible';
        }
        else {
            if (this._animateBttn.classList.contains("checkbox-input_active")) {
                this._setProgress(0);
                this._valueInput.value=''; 
                this._animateBttn.classList.add("checkbox-input");
                this._animateBttn.classList.remove("checkbox-input_active");
            }
            this._bar.style.visibility='hidden';
            this._hideBttn.classList.add("checkbox-input_active");
            this._hideBttn.classList.remove("checkbox-input");
        }
    }
}

const progress = new Progress('.progress-bar','.progress-bar__circle', '.input__value', '.button_animate', '.button_hide');
progress.setEventListeners();