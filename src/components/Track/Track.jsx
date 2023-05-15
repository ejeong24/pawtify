import React, {useContext, useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import {getOne, getRecommendations} from "../spotify";
import {ProfileContext} from "../../context/profileContext";

export async function loader({params}) {
  const trackDetails = await getOne("tracks", params.id, "?market=US");
  //   const trackAnalysis = await getOne("analysis", params.id);
  //   const trackFeatures = await getOne("features", params.id);
  const similarMusic = await getRecommendations(
    "recommend",
    `?limit=5&seed_tracks=${params.id}`,
  );
  return {trackDetails, similarMusic};
}

function Track() {
  const {state, dispatch} = useContext(ProfileContext);
  const {trackDetails, similarMusic} = useLoaderData();
  const [isFavorite, setIsFavorite] = useState(false);
  let {
    name,
    album,
    artists,
    external_urls,
    duration_ms,
    popularity,
    preview_url,
    explicit,
  } = trackDetails;
  let {tracks} = similarMusic;

  const seconds = Math.floor((duration_ms / 1000) % 60);
  const minutes = Math.floor((duration_ms / 1000 / 60) % 60);
  const formattedTime = [
    minutes.toString().padStart(1, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
  return (
    <article className="container flex max-w-2xl mx-auto">
      <img src={album.images[1].url} />
      album details:
      <Link to={`../albums/${album.id}`}>
        {album.name} {album.release_date}
      </Link>
      artist details:
      <Link to={`../artists/${artists[0].id}`}>{artists[0].name}</Link>
      <a href={external_urls.spotify}>See on spotify</a>
      {preview_url}
      {explicit}
      {popularity}
      {name}
      {formattedTime}
    </article>
  );
}

export default Track;

{
  /**{
    "album": {
        "album_type": "single",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1Ffb6ejR6Fe5IamqA5oRUF"
                },
                "href": "https://api.spotify.com/v1/artists/1Ffb6ejR6Fe5IamqA5oRUF",
                "id": "1Ffb6ejR6Fe5IamqA5oRUF",
                "name": "Bring Me The Horizon",
                "type": "artist",
                "uri": "spotify:artist:1Ffb6ejR6Fe5IamqA5oRUF"
            }
        ],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/3zZBB971MYFVBYlzNrYpoA"
        },
        "href": "https://api.spotify.com/v1/albums/3zZBB971MYFVBYlzNrYpoA",
        "id": "3zZBB971MYFVBYlzNrYpoA",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273068b7b754072969555a095f5",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02068b7b754072969555a095f5",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851068b7b754072969555a095f5",
                "width": 64
            }
        ],
        "is_playable": true,
        "name": "LosT",
        "release_date": "2023-05-04",
        "release_date_precision": "day",
        "total_tracks": 1,
        "type": "album",
        "uri": "spotify:album:3zZBB971MYFVBYlzNrYpoA"
    },
    "artists": [
        {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/1Ffb6ejR6Fe5IamqA5oRUF"
            },
            "href": "https://api.spotify.com/v1/artists/1Ffb6ejR6Fe5IamqA5oRUF",
            "id": "1Ffb6ejR6Fe5IamqA5oRUF",
            "name": "Bring Me The Horizon",
            "type": "artist",
            "uri": "spotify:artist:1Ffb6ejR6Fe5IamqA5oRUF"
        }
    ],
    "disc_number": 1,
    "duration_ms": 205368,
    "explicit": true,
    "external_ids": {
        "isrc": "GBARL2202050"
    },
    "external_urls": {
        "spotify": "https://open.spotify.com/track/5BgnL6gHauuvxe4Ok6W1aC"
    },
    "href": "https://api.spotify.com/v1/tracks/5BgnL6gHauuvxe4Ok6W1aC",
    "id": "5BgnL6gHauuvxe4Ok6W1aC",
    "is_local": false,
    "is_playable": true,
    "name": "LosT",
    "popularity": 80,
    "preview_url": "https://p.scdn.co/mp3-preview/55060bb10c952fc58de331bdae254a43f3b48882?cid=1f3d9dd466cd400784c8476e6cf4a80d",
    "track_number": 1,
    "type": "track",
    "uri": "spotify:track:5BgnL6gHauuvxe4Ok6W1aC"
} 
{
    "tracks": [
        {
            "album": {
                "album_group": "ALBUM",
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/0FHW0Lp33r3fvIG0HL4mW0"
                        },
                        "href": "https://api.spotify.com/v1/artists/0FHW0Lp33r3fvIG0HL4mW0",
                        "id": "0FHW0Lp33r3fvIG0HL4mW0",
                        "name": "Self Deception",
                        "type": "artist",
                        "uri": "spotify:artist:0FHW0Lp33r3fvIG0HL4mW0"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/2kbZiGYaaZUDZM014s8xnN"
                },
                "href": "https://api.spotify.com/v1/albums/2kbZiGYaaZUDZM014s8xnN",
                "id": "2kbZiGYaaZUDZM014s8xnN",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b2735ebbeedbe831f4c6771fc2e5",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e025ebbeedbe831f4c6771fc2e5",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d000048515ebbeedbe831f4c6771fc2e5",
                        "width": 64
                    }
                ],
                "is_playable": true,
                "name": "You Are Only As Sick As Your Secrets",
                "release_date": "2023-02-24",
                "release_date_precision": "day",
                "total_tracks": 11,
                "type": "album",
                "uri": "spotify:album:2kbZiGYaaZUDZM014s8xnN"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0FHW0Lp33r3fvIG0HL4mW0"
                    },
                    "href": "https://api.spotify.com/v1/artists/0FHW0Lp33r3fvIG0HL4mW0",
                    "id": "0FHW0Lp33r3fvIG0HL4mW0",
                    "name": "Self Deception",
                    "type": "artist",
                    "uri": "spotify:artist:0FHW0Lp33r3fvIG0HL4mW0"
                }
            ],
            "disc_number": 1,
            "duration_ms": 216983,
            "explicit": true,
            "external_ids": {
                "isrc": "SE6DB2300101"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/4rBkuvKIBAw19IdnOISU5a"
            },
            "href": "https://api.spotify.com/v1/tracks/4rBkuvKIBAw19IdnOISU5a",
            "id": "4rBkuvKIBAw19IdnOISU5a",
            "is_local": false,
            "is_playable": true,
            "name": "Holy Water",
            "popularity": 50,
            "preview_url": "https://p.scdn.co/mp3-preview/f58cf3bcc1fd7ca8d733f0800c3d9c3e1803932b?cid=1f3d9dd466cd400784c8476e6cf4a80d",
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:4rBkuvKIBAw19IdnOISU5a"
        },
        {
            "album": {
                "album_group": "ALBUM",
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k"
                        },
                        "href": "https://api.spotify.com/v1/artists/6guC9FqvlVboSKTI77NG2k",
                        "id": "6guC9FqvlVboSKTI77NG2k",
                        "name": "Dance Gavin Dance",
                        "type": "artist",
                        "uri": "spotify:artist:6guC9FqvlVboSKTI77NG2k"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/6c5mEBiGZdHm0lnzvlbXVW"
                },
                "href": "https://api.spotify.com/v1/albums/6c5mEBiGZdHm0lnzvlbXVW",
                "id": "6c5mEBiGZdHm0lnzvlbXVW",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273b01942b135e9b5548a67ad13",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02b01942b135e9b5548a67ad13",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851b01942b135e9b5548a67ad13",
                        "width": 64
                    }
                ],
                "is_playable": true,
                "name": "Jackpot Juicer",
                "release_date": "2022-07-29",
                "release_date_precision": "day",
                "total_tracks": 18,
                "type": "album",
                "uri": "spotify:album:6c5mEBiGZdHm0lnzvlbXVW"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k"
                    },
                    "href": "https://api.spotify.com/v1/artists/6guC9FqvlVboSKTI77NG2k",
                    "id": "6guC9FqvlVboSKTI77NG2k",
                    "name": "Dance Gavin Dance",
                    "type": "artist",
                    "uri": "spotify:artist:6guC9FqvlVboSKTI77NG2k"
                }
            ],
            "disc_number": 1,
            "duration_ms": 199690,
            "explicit": true,
            "external_ids": {
                "isrc": "QMRSZ2103060"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/6G5JufGbj4GIVMG1ZVDCjW"
            },
            "href": "https://api.spotify.com/v1/tracks/6G5JufGbj4GIVMG1ZVDCjW",
            "id": "6G5JufGbj4GIVMG1ZVDCjW",
            "is_local": false,
            "is_playable": true,
            "name": "Feels Bad Man",
            "popularity": 56,
            "preview_url": "https://p.scdn.co/mp3-preview/490b0c55be5f8f833f23d1b6f5bbec803d1b5802?cid=1f3d9dd466cd400784c8476e6cf4a80d",
            "track_number": 9,
            "type": "track",
            "uri": "spotify:track:6G5JufGbj4GIVMG1ZVDCjW"
        },
        {
            "album": {
                "album_group": "ALBUM",
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/5pqvAI85RMxL9K0xHvSwGu"
                        },
                        "href": "https://api.spotify.com/v1/artists/5pqvAI85RMxL9K0xHvSwGu",
                        "id": "5pqvAI85RMxL9K0xHvSwGu",
                        "name": "Currents",
                        "type": "artist",
                        "uri": "spotify:artist:5pqvAI85RMxL9K0xHvSwGu"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/0llAadNufIDvVRzWfSxQxC"
                },
                "href": "https://api.spotify.com/v1/albums/0llAadNufIDvVRzWfSxQxC",
                "id": "0llAadNufIDvVRzWfSxQxC",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273b611f6216abd4fad424bca39",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02b611f6216abd4fad424bca39",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851b611f6216abd4fad424bca39",
                        "width": 64
                    }
                ],
                "is_playable": true,
                "name": "The Death We Seek",
                "release_date": "2023-05-05",
                "release_date_precision": "day",
                "total_tracks": 10,
                "type": "album",
                "uri": "spotify:album:0llAadNufIDvVRzWfSxQxC"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/5pqvAI85RMxL9K0xHvSwGu"
                    },
                    "href": "https://api.spotify.com/v1/artists/5pqvAI85RMxL9K0xHvSwGu",
                    "id": "5pqvAI85RMxL9K0xHvSwGu",
                    "name": "Currents",
                    "type": "artist",
                    "uri": "spotify:artist:5pqvAI85RMxL9K0xHvSwGu"
                }
            ],
            "disc_number": 1,
            "duration_ms": 251270,
            "explicit": false,
            "external_ids": {
                "isrc": "DED832200495"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/5lkdLW1DpeaCT95puvv15Q"
            },
            "href": "https://api.spotify.com/v1/tracks/5lkdLW1DpeaCT95puvv15Q",
            "id": "5lkdLW1DpeaCT95puvv15Q",
            "is_local": false,
            "is_playable": true,
            "name": "Guide Us Home",
            "popularity": 55,
            "preview_url": "https://p.scdn.co/mp3-preview/2254a5198fbca44c40056ca8e578df6c7c1ee2d9?cid=1f3d9dd466cd400784c8476e6cf4a80d",
            "track_number": 10,
            "type": "track",
            "uri": "spotify:track:5lkdLW1DpeaCT95puvv15Q"
        },
        {
            "album": {
                "album_group": "SINGLE",
                "album_type": "SINGLE",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/1CF8aEN939swnuIZGFI7Hk"
                        },
                        "href": "https://api.spotify.com/v1/artists/1CF8aEN939swnuIZGFI7Hk",
                        "id": "1CF8aEN939swnuIZGFI7Hk",
                        "name": "The Word Alive",
                        "type": "artist",
                        "uri": "spotify:artist:1CF8aEN939swnuIZGFI7Hk"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/3pnXp6i9be5TieRJC4oHsE"
                },
                "href": "https://api.spotify.com/v1/albums/3pnXp6i9be5TieRJC4oHsE",
                "id": "3pnXp6i9be5TieRJC4oHsE",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b2733e9ea04c28943bf6ba5a1476",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e023e9ea04c28943bf6ba5a1476",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d000048513e9ea04c28943bf6ba5a1476",
                        "width": 64
                    }
                ],
                "is_playable": true,
                "name": "New Reality",
                "release_date": "2023-03-03",
                "release_date_precision": "day",
                "total_tracks": 2,
                "type": "album",
                "uri": "spotify:album:3pnXp6i9be5TieRJC4oHsE"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1CF8aEN939swnuIZGFI7Hk"
                    },
                    "href": "https://api.spotify.com/v1/artists/1CF8aEN939swnuIZGFI7Hk",
                    "id": "1CF8aEN939swnuIZGFI7Hk",
                    "name": "The Word Alive",
                    "type": "artist",
                    "uri": "spotify:artist:1CF8aEN939swnuIZGFI7Hk"
                }
            ],
            "disc_number": 1,
            "duration_ms": 176000,
            "explicit": false,
            "external_ids": {
                "isrc": "QM4TW2393429"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/6iO0oyy7PjgeOa3TMvcI8e"
            },
            "href": "https://api.spotify.com/v1/tracks/6iO0oyy7PjgeOa3TMvcI8e",
            "id": "6iO0oyy7PjgeOa3TMvcI8e",
            "is_local": false,
            "is_playable": true,
            "name": "New Reality",
            "popularity": 55,
            "preview_url": "https://p.scdn.co/mp3-preview/9bc62d23e326e9a215f9a33a911e18603ef09799?cid=1f3d9dd466cd400784c8476e6cf4a80d",
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:6iO0oyy7PjgeOa3TMvcI8e"
        },
        {
            "album": {
                "album_group": "SINGLE",
                "album_type": "SINGLE",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz"
                        },
                        "href": "https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz",
                        "id": "6XyY86QOPPrYVGvF9ch6wz",
                        "name": "Linkin Park",
                        "type": "artist",
                        "uri": "spotify:artist:6XyY86QOPPrYVGvF9ch6wz"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/30LrTt6t4su1DMqI5dTjyv"
                },
                "href": "https://api.spotify.com/v1/albums/30LrTt6t4su1DMqI5dTjyv",
                "id": "30LrTt6t4su1DMqI5dTjyv",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b2733aaf6af6310182b488ea7c75",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e023aaf6af6310182b488ea7c75",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d000048513aaf6af6310182b488ea7c75",
                        "width": 64
                    }
                ],
                "is_playable": true,
                "name": "Lost (PLZ Tethered Version)",
                "release_date": "2023-04-21",
                "release_date_precision": "day",
                "total_tracks": 2,
                "type": "album",
                "uri": "spotify:album:30LrTt6t4su1DMqI5dTjyv"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz"
                    },
                    "href": "https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz",
                    "id": "6XyY86QOPPrYVGvF9ch6wz",
                    "name": "Linkin Park",
                    "type": "artist",
                    "uri": "spotify:artist:6XyY86QOPPrYVGvF9ch6wz"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0CuRSsgyTCUJQLXLoUpqpf"
                    },
                    "href": "https://api.spotify.com/v1/artists/0CuRSsgyTCUJQLXLoUpqpf",
                    "id": "0CuRSsgyTCUJQLXLoUpqpf",
                    "name": "Patrick Lawrence Zappia",
                    "type": "artist",
                    "uri": "spotify:artist:0CuRSsgyTCUJQLXLoUpqpf"
                }
            ],
            "disc_number": 1,
            "duration_ms": 202991,
            "explicit": false,
            "external_ids": {
                "isrc": "USWB12301682"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/6mPBbL3WsTHy2xZ0A7l1Mq"
            },
            "href": "https://api.spotify.com/v1/tracks/6mPBbL3WsTHy2xZ0A7l1Mq",
            "id": "6mPBbL3WsTHy2xZ0A7l1Mq",
            "is_local": false,
            "is_playable": true,
            "name": "Lost - PLZ Tethered Version",
            "popularity": 66,
            "preview_url": "https://p.scdn.co/mp3-preview/ff6cf996bcb93435df67943714acffa022305241?cid=1f3d9dd466cd400784c8476e6cf4a80d",
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:6mPBbL3WsTHy2xZ0A7l1Mq"
        }
    ],
    "seeds": [
        {
            "initialPoolSize": 519,
            "afterFilteringSize": 519,
            "afterRelinkingSize": 519,
            "id": "5BgnL6gHauuvxe4Ok6W1aC",
            "type": "TRACK",
            "href": "https://api.spotify.com/v1/tracks/5BgnL6gHauuvxe4Ok6W1aC"
        }
    ]
}


*/
}
