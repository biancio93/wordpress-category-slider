function create_shortcode_categories_carousel_v2(){
    $categories = get_categories( array(
	'orderby' => 'rand',
    'order' => 'ASC'
) );
    foreach($categories as $category) {
	$category_link = get_category_link($category->term_id);
	$category_name = $category->name;
	$category_image = '<img class="cat-img-carousel" src="' . get_field('immagine_categoria', $category) . '" draggable="false" />';
	$category_element = '<a class="card" href="' . $category_link  . '" />' . '<h3 class="carousel-cat-title">' . $category_name . '</h3>' . $category_image . '</a>';
	$category_Archive = $category_Archive . $category_element;
}
	 return '<div class="container-global"><div class="container-slider" style="left: 0vw; transform: translate3d(-100vw, 0vw, 0vw);">' . $category_Archive . '</div><div class="container-control"><button class="btn-control control-prev"><span class="et-pb-icon "style="font-size: 33px;">&#x34;</span></button><button class="btn-control control-next"><span class="et-pb-icon "style="font-size: 33px;">&#x35;</span></button></div></div>';
}
add_shortcode('shortcode_categories_carousel_v2', 'create_shortcode_categories_carousel_v2');