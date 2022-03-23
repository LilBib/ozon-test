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
        this._changeInputValueBinded = this._changeInputValue.bind(this);

        this.setEventListeners();
    }

    setEventListeners () {
        this._animateBttn.addEventListener('click', this._animateBttnHandlerBinded);
        this._valueInput.addEventListener('input', this._inputValueHandlerBinded);
        this._hideBttn.addEventListener('click', this._hideBttnHandlerBinded)
    }

    _setProgress (percent) {
        const offset = this._circleLength - percent / 100 * this._circleLength;
        this._circle.style.strokeDasharray = `${this._circleLength} ${this._circleLength}`
        this._circle.style.strokeDashoffset = offset;
    }

    _inputValueHandler () {
        this._circle.style.transition='all 0.2s ease-out';
        if (this._animateBttn.classList.contains("button_active")) {
            this._stopAnimating();
        }
        if (this._hideBttn.classList.contains("button_active")) {
            this._stopHiding();
        }
        if(this._valueInput.value>100) {
            this._valueInput.value=100
        }
        if(this._valueInput.value<0) {
            this._valueInput.value=0;
        }
        this._setProgress(this._valueInput.value)
    }
    
    _changeInputValue () {
        if(this._valueInput.value==100) {
            this._valueInput.value='0'
        }
        else {
            this._valueInput.value=`${Number(this._valueInput.value)+1}`
            this._setProgress(this._valueInput.value)
        }
    }

    _stopHiding () {
        this._hideBttn.classList.remove("button_active");
        this._hideBttn.classList.add("button");
        this._bar.style.visibility='visible';
    }

    _stopAnimating () {
        this._animateBttn.classList.add("button");
        this._animateBttn.classList.remove("button_active");
        clearInterval(this._interval);
    }

    _animateBttnHandler () {
        this._circle.style.transition='';
        if (this._animateBttn.classList.contains("button_active")) {
            this._stopAnimating();
        }
        else {
            if (this._hideBttn.classList.contains("button_active")) {
                this._stopHiding();
            }
            this._animateBttn.classList.remove("button");
            this._animateBttn.classList.add("button_active");
            this._interval=setInterval(this._changeInputValueBinded,10);
            
        }
    }
    
    _hideBttnHandler () {
        this._circle.style.transition='';
        if (this._hideBttn.classList.contains("button_active")) {
            this._stopHiding();
        }
        else {
            if (this._animateBttn.classList.contains("button_active")) {
                this._stopAnimating();
            }
            this._bar.style.visibility='hidden';
            this._hideBttn.classList.add("button_active");
            this._hideBttn.classList.remove("button");
        }
    }
}

const progress = new Progress('.progress-bar', '.progress-bar__circle', '.input__value', '.button_animate', '.button_hide');