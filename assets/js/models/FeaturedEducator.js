class FeaturedEducator {
    constructor () {
        this.endpoint = '/data/streamers.json'
        this.streamerHtml = ''
    }

    getEducatorData (offset = 0) {
       fetch(this.endpoint, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            let featuredEducators = data[0].streamers

            if (offset > 0) {
                featuredEducators = featuredEducators.splice(offset)
                this.lazyLoad(featuredEducators)
            }
        })
    }

    lazyLoad (streamers = false) {
        if (!streamers) {
            return;
        }

        for (var index in streamers) {
            let
                streamer = streamers[index],
                educatorGrid = document.createElement('div'),
                educatorLink = document.createElement('a'),
                educatorBio = document.createElement('div')
            ;

            if (typeof streamer.collectives != 'undefined') {
                var collectives = streamer.collectives.toString().replace(',', ' ');
            }
            
            if (typeof streamer.sciences != 'undefined') {
                var sciences = streamer.sciences.toString().replace(',', ' ');
            }

            if (typeof streamer.streaming_platforms != 'undefined') {
                var streamingPlatforms = Object.keys(streamer.streaming_platforms).toString().replace(',', ' ');
            }

            educatorGrid.classList.add('featured-educator');
            educatorGrid.setAttribute('data-ajax-loaded', true);
            educatorGrid.setAttribute('role', 'img');
            educatorGrid.setAttribute('aria-label', typeof streamer.name != 'undefined' ? streamer.name : streamer.title);

            if (typeof sciences != 'undefined') {
                educatorGrid.className += (' ' + sciences);
            }

            if (typeof streamingPlatforms != 'undefined') {
                educatorGrid.className += (' ' + streamingPlatforms);
            }

            if (typeof collectives != 'undefined') {
                educatorGrid.className += (' ' + collectives);
            }

            if (typeof streamer.images.thumbnail.filename != 'undefined' && streamer.images.thumbnail.filename.length > 0) {
                educatorGrid.setAttribute('style', 'background-image: url(/assets/images/educators/thumbnails/' + streamer.images.thumbnail.filename + ');');
            }

            educatorLink.setAttribute('href', streamer.url);
            educatorBio.classList.add('educator-minibio');

            let educatorBioTitle = document.createElement('h3');
            educatorBioTitle.classList.add('h4');
            
            if (typeof streamer.name != 'undefined') {
                let displayName = '<span class="display-name">(' + new String(streamer.title).toLowerCase() + ')</span>';
                educatorBioTitle.innerHTML = streamer.name;
                educatorBioTitle.innerHTML += displayName;
            } else {
                educatorBioTitle.innerHTML = streamer.title;
            }

            educatorBio.appendChild(educatorLink);
            educatorBio.appendChild(educatorBioTitle);
            educatorGrid.appendChild(educatorBio);
            this.streamerHtml += educatorGrid.outerHTML;
        }

        if (this.streamerHtml.length > 0) {
            document.querySelector('.featured-educators').insertAdjacentHTML('beforeend', this.streamerHtml);
        }
    }
}

export default new FeaturedEducator;
