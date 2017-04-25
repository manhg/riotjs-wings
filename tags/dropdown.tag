<x-dropdown>

<div ref="box" onclick={ toggleDropdown }>
    <span>{ active.name }</span>
    <span show={ openning }>
        ▼
    </span>
    <span hide={ openning }>
        ▷
    </span>
</div>
<!-- ▶▽ -->

<div ref="dropdown" show={ openning }>
    <input type="text" placeholder="Filter" ref="filter" onkeyup={ setCandidates } />
    <section class=candidates>
        <div class='{"active": candidate.id == active.id }'
            each={ candidate in candidates }
            onclick={ choose }>
            { candidate.name }
        </div>
    </section>
</div>

<style type="stylus">
.candidates
    min-height: 100px
    height: 10em
    overflow-y: scroll
    
    >div
        cursor: pointer
        padding: 0.2em


[ref=box]
    cursor: pointer

[ref=filter]
    border: solid 1px #eee
    width: 100%
    padding: 0.2em

[ref=dropdown]
    width: 200px
    min-height: 150px
    border: solid 1px #eee
    box-shadow: 2px 2px 2px #ccc

    opacity: 1
    transition: opacity 1s

    .active
        background: blue
        color: white
</style>

<script type=coffee>
@active = opts.active

@openning = true

@numberSuggestion = opts.numberSuggestion or 10


@choose = (e) =>
    if e.item.candidate.id is @active.id
        @toggleDropdown()
    else
        @update
            active: e.item.candidate
        @trigger 'chosen', e.item.candidate
        @toggleDropdown()

@rankFn = opts.rankFn or (item) ->
    # return false to execluded from results
    # set `_rank` to sort results
    if item.name
        item._rank = item.name.toLocaleLowerCase().indexOf this
        if item._rank is -1
            return false
    item

@setCandidates = =>
    items = opts.items
    keyword = @refs.filter.value
    if keyword
        items = items.filter @rankFn.bind keyword
        items = items.sort (item1, item2) ->
            item1._rank - item2._rank
    @update
        candidates: items.slice(0, @numberSuggestion)

@toggleDropdown = =>
    @update
        openning: not @openning
    if @openning
        @refs.filter.focus()

@on 'mount', ->
    @setCandidates()
    null
</script>

</x-dropdown>
