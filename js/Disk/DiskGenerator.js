function generate(minTracks, maxTracks, range){//returns list of tracks
	numTracks = Math.random() * (maxTracks - minTracks) + minTracks;
	var tracks = [], direction = Math.round(Math.random()) * 2 - 1, startPosition = Math.floor(Math.random() * range);

	for(var x = 0; x < numTracks; x++){
		tracks[x] = Math.floor(Math.random() * range);
		while(tracks[x] == 0 || tracks[x] == 4000)
			tracks[x] = Math.floor(Math.random() * range);
	}

	return {tracks: tracks, direction: direction, startPosition: startPosition};
}