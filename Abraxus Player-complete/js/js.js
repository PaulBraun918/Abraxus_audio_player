ax = 1;
jQuery(document).ready(function() {

	container = $('.container');
	cover = $('.cover');
	play = $('#play');
	pause = $('#pause');
	mute = $('#mute');
	muted = $('#muted');
	close = $('#close');
	var startmusic = $('div.player a.mp-src:first').attr('href');
	ax = song = new Audio(startmusic);
	duration = song.duration;

	if (song.canPlayType('audio/mpeg;')) {
    	song.type= 'audio/mpeg';
	} else {
    	song.type= 'audio/ogg';
	}


	
	play.on('click', function(e) {
		e.preventDefault();
		
		$(this).toggleClass('mp-playing');
		if (song.paused  )
		{
			song.play();
			
		}else
			song.pause();
		container.addClass('containerLarge');
		cover.addClass('coverLarge');
		$('#close').fadeIn(300);

	});


	mute.on('click', function(e) {
		e.preventDefault();
		song.muted = !song.muted;
		$(this).toggleClass('mp-muted');
	});

	$('#close').click(function(e) {
		e.preventDefault();
		container.removeClass('containerLarge');
		cover.removeClass('coverLarge');
		song.pause();
		
		$('#play').removeClass('mp-playing');
		song.currentTime = 0;
		$('#close').fadeOut(300);
	});

	song.addEventListener('timeupdate',function (){
		curtime = parseInt(song.currentTime, 10);
	});

	$('div.player a.mp-src').on('click', function(e){
		e.preventDefault();
		var playing = song.paused;
		
		song.src= $(this).attr('href');
		
		$('#play').removeClass('mp-playing');		
		$('#play').addClass('mp-playing');
		
		song.play();
		container.addClass('containerLarge');
		cover.addClass('coverLarge');
		$('#close').fadeIn(300);


		$('div.player a.mp-src').removeClass('active');
		$(this).addClass('active');
	});

	$('#seek').change(function(){
		song.volume = $(this).val()/100;
		console.log(song.volume);
	});
	$('#seek').val(10);
});
