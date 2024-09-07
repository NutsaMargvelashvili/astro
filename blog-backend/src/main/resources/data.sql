INSERT INTO user (user_id, email, user_name, password_hash, provider, created_by, created_date) VALUES
 ( 1, 'admin@mail.com', 'admin', '$2a$04$ItDBvcn41QncTbDL6Q2eNOHVQf5US/bdwQj/aczc2AGoGoEaX.ogi', 'local', 'system', now());

 INSERT INTO user (user_id, email, user_name, password_hash, provider, created_by, created_date) VALUES
 ( 2, 'user1@mail.com', 'user1','$2a$04$Qao0KqDim7VubPHV9x.oj.awaz0ArpPNlU7l0q18ZdsBXJn82dKPG', 'local', 'system', now());

INSERT INTO authority (name) VALUES
 ('ROLE_ADMIN'), ('ROLE_USER' );

INSERT INTO user_authority (user_id,authority_name) VALUES
 ( 1, 'ROLE_ADMIN'), (1, 'ROLE_USER'), (2, 'ROLE_USER');

INSERT INTO post (title, body, user_id, created_by, created_date, last_modified_by, last_modified_date) VALUES
 ( 'Astronomers compile largest MeerKAT radio source catalog to date'
 , '<p>Using MeerKAT data, an international team including astronomers from MPIfR (Bonn, Germany) has compiled the largest catalog of radio sources from any MeerKAT survey to date. With this catalog, they were able to make a measurement of the cosmic radio dipole, a cosmological effect that arises from the Earth''s motion through the universe, and provides an important test of our theories of cosmology at the largest scales. <br/><br/>

The new catalog and accompanying scientific results of the study are described in a paper released on the preprint server arXiv, and have been accepted for publication in Astronomy & Astrophysics.<br/><br/>

The new measurement demonstrates the value of the sensitive MeerKAT data, and shows that such deep data provide extremely valuable insights into the origin of the cosmic dipole effect.<br/><br/>

Looking up at the sky at radio wavelengths, rather than the stars one sees predominantly galaxies that are extremely far away. Observing the radio sky provides an unobstructed window into the evolution of galaxies, black holes, and gas in the universe, and can also show what the universe looks like at the largest scales.</p>'
 , '1', 'keumtae.kim', now()-1, 'keumtae.kim', now()-1);

 INSERT INTO post (title, body, user_id, created_by, created_date, last_modified_by, last_modified_date) VALUES
 ( 'Meet Phaethon, a weird asteroid that thinks it''s a comet—new research may explain what''s going on"'
 , '<p>What''s the difference between an asteroid and a comet? A comet is basically a dirty iceball composed of rock and ice. The classic image is of a bright "star" in the night sky with a long curved tail extending into space. This is what happens when they approach the sun and start emitting gases and releasing dust. It normally continues until there''s nothing left but rock or until they fragment into dust. <br/><br/>

Asteroids, on the other hand, are primarily just rocks. They might conjure up notions of Hans Solo steering the Millennium Falcon through an implausibly dense "asteroid field" to escape a swarm of TIE Fighters, but mostly they just quietly orbit the sun, minding their own business. <br/><br/>

Yet these two space objects are not always as mutually exclusive as this would suggest. Let me introduce Phaethon, a "rock comet" that blurs the definitions between asteroid and comet, and let me tell you why it will be worth paying attention to this fascinating object in the coming years. <br/><br/>

Phaethon was discovered by chance in 1983 by two astronomers at the University of Leicester, Simon Green and John Davies. They came across it orbiting the sun while analyzing images collected by a space telescope called the Infrared Astronomical Satellite (Iras). Soon after, other astronomers recognized that Phaethon is the source of the annual Geminid meteor shower—one of the brightest meteor displays in Earth''s calendar. <br/><br/>

Every December, as our planet crosses the dusty trail left behind by Phaethon, we are treated to a brilliant spectacle as its dust grains burn up in our atmosphere. Yet Phaethon''s behavior is unlike that of any other objects responsible for a meteor shower.</p>'
 , '1', 'keumtae.kim', now()-2, 'keumtae.kim', now()-2);

INSERT INTO post (title, body, user_id, created_by, created_date, last_modified_by, last_modified_date) VALUES
 ( 'Q&A: Astronomers await a once-in-80-year stellar explosion'
 , '<p>We sat down with Carnegie Science Observatories theoretical astrophysicist Tony Prio to talk about T Coronae Borealis, the stellar explosion that occurs once every 80 years and is due to light up in the coming months.<br/><br/>

<b>Q: We''ve seen some headlines about a stellar explosion that might be happening sometime very soon. Can you tell us what this is?</b> <br/><br/>
Tony Piro: This is T Coronae Borealis. It is a binary consisting of a white dwarf star and a red giant star. A white dwarf is basically the leftover ember after a star has exhausted its nuclear fuel and has a mass almost 40% greater than our sun.<br/><br/>

The binary is in a 227-day orbit. The red giant is so big that its material is being pulled off by the gravity of the white dwarf. This material forms a disk around the white dwarf. Then, over time, the disk transfers material onto the white dwarf''s surface.</p>'
 , '1', 'keumtae.kim', now()-3, 'keumtae.kim', now()-3);

INSERT INTO post (title, body, user_id, created_by, created_date, last_modified_by, last_modified_date) VALUES
 ( 'Origins of variability in X-ray photons from a symbiotic binary star as revealed by dimensionality reduction"'
 , '<p>Symbiotic binary stars are a type of binary star system that consists of a compact star (such as a white dwarf) and a red giant star. In these systems, a compact star accretes materials from a red giant star and produces soft X-ray photons. However, some of them—known as hard X-ray-emitting symbiotic stars—also produce powerful X-ray photons, which may be due to the presence of massive white dwarfs.</p>'
 , '1', 'keumtae.kim', now()-4, 'keumtae.kim', now()-4);

INSERT INTO post (title, body, user_id, created_by, created_date, last_modified_by, last_modified_date) VALUES
 ( 'Data from space probes show that Alfvén waves drive the acceleration and heating of the solar wind'
 , '<p>By studying data from NASA''s Parker Solar Probe and the ESA Solar Orbiter, an international team of astrophysicists has found that Alfvén waves drive the acceleration and heating of the solar wind.<br/><br/>

In their study, published in the journal Science, the group compared data from the two space probes to learn more about energy sources impacting the solar wind.<br/><br/>

Luca Sorriso-Valvo and Francesco Malara, with the CNR–Institute for Plasma Science and Technology, in Sweden, and the University of Calabria, in Italy, respectively, have published a Perspective piece in the same journal issue outlining the work done by the group.</p>'
 , '1', 'keumtae.kim', now()-5, 'keumtae.kim', now()-5);

INSERT INTO comment (body, created_date, last_modified_date, post_id, user_id) VALUES
( 'WOWWWW! What a great news!'
, now()-5, now()-5, 1, 1);

INSERT INTO comment (body, created_date, last_modified_date, post_id, user_id) VALUES
( 'What tf is MeerKAT data?'
, now()-5, now()-5, 1, 2);

INSERT INTO photo (file_name, file_url, uploaded_date, user_id) VALUES
    ('cat.jpg', 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg', now(), 1);