function SlideManager(args) {
    function SlideManager(args) {
        Object.assign(this, {
            index: 0,
            interval: 10000,
            rootNode: null,
            slideClass: 'slides',
            dotClass: 'dot',
            dotActiveClass: 'dotActive',
            slideActiveClass: 'slideActive'
        }, args);
    }

    SlideManager.prototype = Object.create(null);
    SlideManager.prototype.constructor = SlideManager;

    SlideManager.prototype.getSlides = function getSlides() {
        return (this.rootNode || document).getElementsByClassName(this.slideClass);
    };

    SlideManager.prototype.getDots = function getDots() {
        return (this.rootNode || document).getElementsByClassName(this.dotClass)
    }

    SlideManager.prototype.getMaxSlides = function getMaxSlides() {
        return this.getSlides().length;
    };

    SlideManager.prototype.advance = function advance(n) {
        n = typeof n !== 'number' ? 1 : n;
        var maxSlides = this.getMaxSlides();
        this.index = (this.index + n + maxSlides) % maxSlides;
        this.updateSlide();
    };

    SlideManager.prototype.retract = function retract(n) {
        n = typeof n !== 'number' ? 1 : n;
        var maxSlides = this.getMaxSlides();
        this.index = (this.index - n + maxSlides) % maxSlides;
        this.updateSlide();
    };

    SlideManager.prototype.updateSlide = function () {
        var i;
        var slides = this.getSlides();
        for (i = 0; i < slides.length; i += 1) {
            if (i === this.index) {
                slides[i].classList.add(this.slideActiveClass);
            } else {
                slides[i].classList.remove(this.slideActiveClass);
            }
        }

        var dots = this.getDots();
        for (i = 0; i < dots.length; i += 1) {
            if (i === this.index) {
                dots[i].classList.add(this.dotActiveClass);
            } else {
                dots[i].classList.remove(this.dotActiveClass);
            }
        }

    };

    SlideManager.prototype.start = function start() {
        if (this._intervalHandle) {
            return;
        }
        this.updateSlide();
        this._intervalHandler = (function intervalHandler() {
            this.advance(1);
        }).bind(this);
        this._intervalHandle = window.setInterval(this._intervalHandler, this.interval);
    };

    SlideManager.prototype.stop = function stop() {
        if (!this._intervalHandle) {
            return;
        }
        window.clearInterval(this._intervalHandler);
        this._intervalHandler = null;
    };

    SlideManager.prototype.restart = function restart() {
        this.stop();
        this.start();
    };

    return new SlideManager(args);
};
