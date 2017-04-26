<x-rating>
    <span each={ step in STEPS } onclick={ setValue }>
        { step <= value ? '★': '☆' }
    </span>

    <style type=stylus>
    span
        cursor: pointer
        color: #ffcc00
        transition: all 1s ease
        display: inline-block

        &:hover
            color: #ff9900
            margin-bottom: 0.3em
    </style>

    <script type=coffee>
    @value = +opts.value
    @STEPS = [1..5]

    @setValue = (e) =>
        @update
            value: e.item.step

        @trigger 'changed', @value
    </script>
</x-rating>